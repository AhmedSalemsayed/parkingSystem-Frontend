import { useQueryClient } from "@tanstack/react-query";
import { Card } from "./ui/card";
import { ParkingStateReport } from "@/lib/types";
import { MapPin } from "lucide-react";
import { getOccupancyRate, getStatusColor } from "@/lib/utils";

export default function AdminZoneDetailsTable() {
  const queryClient = useQueryClient();
  const parkingStateReport = queryClient
    .getQueryCache()
    .get('["ParkingStateReport"]')?.state?.data as ParkingStateReport;
  if (!parkingStateReport) return;
  return (
    <Card className="overflow-x-scroll">
      <div className="p-6 ">
        <h3 className="text-lg font-medium mb-4">Zone Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Zone</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Occupancy</th>
                <th className="text-left py-3 px-4 font-medium">Occupied</th>
                <th className="text-left py-3 px-4 font-medium">Free</th>
                <th className="text-left py-3 px-4 font-medium">Reserved</th>
                <th className="text-left py-3 px-4 font-medium">
                  Visitor Spots
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  Subscriber Spots
                </th>
                <th className="text-left py-3 px-4 font-medium">Subscribers</th>
              </tr>
            </thead>
            <tbody>
              {parkingStateReport.map((zone) => (
                <tr key={zone.zoneId} className="border-b  hover:bg-slate-200">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{zone.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        zone.open
                          ? "bg-primary text-primary-foreground"
                          : "bg-destructive text-white animate-pulse"
                      }`}
                    >
                      {zone.open ? "Open" : "Closed"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${getStatusColor(
                            zone
                          )}`}
                          style={{ width: `${getOccupancyRate(zone)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {getOccupancyRate(zone)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{zone.occupied}</td>
                  <td className="py-3 px-4 text-primary font-medium">
                    {zone.free}
                  </td>
                  <td className="py-3 px-4 text-secondary font-medium">
                    {zone.reserved}
                  </td>
                  <td className="py-3 px-4">{zone.availableForVisitors}</td>
                  <td className="py-3 px-4">{zone.availableForSubscribers}</td>
                  <td className="py-3 px-4">{zone.subscriberCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
