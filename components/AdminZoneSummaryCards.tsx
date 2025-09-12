import React from "react";
import { Card } from "./ui/card";
import { Car, Clock, MapPin, UserCheck } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { ParkingStateReport } from "@/lib/types";

export default function AdminZoneSummaryCards() {
  const queryClient = useQueryClient();
  const parkingStateReport = queryClient
    .getQueryCache()
    .get('["ParkingStateReport"]')?.state?.data as ParkingStateReport;
  if (!parkingStateReport) return;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-hidden ">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Zones</p>
            <p className="text-2xl font-semibold">
              {parkingStateReport.length}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/20 rounded-lg">
            <Car className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Slots</p>
            <p className="text-2xl font-semibold">
              {parkingStateReport.reduce(
                (sum, zone) => sum + zone.totalSlots,
                0
              )}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-lg">
            <UserCheck className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Occupied</p>
            <p className="text-2xl font-semibold">
              {parkingStateReport.reduce((sum, zone) => sum + zone.occupied, 0)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-muted rounded-lg">
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="text-2xl font-semibold">
              {parkingStateReport.reduce((sum, zone) => sum + zone.free, 0)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
