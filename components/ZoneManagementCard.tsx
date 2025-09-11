import { MapPin, Power } from "lucide-react";
import { Card } from "./ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { ParkingStateReport } from "@/lib/types";
import { Button } from "./ui/button";
import useOpenCloseZone from "@/hooks/useOpenCloseZone";

export default function ZoneManagementCard() {
  const queryClient = useQueryClient();
  const parkingStateReport = queryClient
    .getQueryCache()
    .get('["ParkingStateReport"]')?.state?.data as ParkingStateReport;
  const { mutateAsync, isPending } = useOpenCloseZone();
  if (!parkingStateReport) return;
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Power className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Zone Management</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {parkingStateReport.map((zone) => (
          <div
            key={zone.zoneId}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{zone.name}</p>
                <p
                  className={`text-sm ${
                    zone.open ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {zone.open ? "Open" : "Closed"}
                </p>
              </div>
            </div>
            <Button
              variant={zone.open ? "destructive" : "default"}
              size="sm"
              onClick={() =>
                mutateAsync({ zoneId: zone.zoneId, zoneState: zone.open })
              }
              disabled={isPending}
            >
              {zone.open ? "Close" : "Open"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
