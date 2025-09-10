"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import useTicketCheckIn from "@/hooks/useTicketCheckIn";
import { ParkingTicketModal } from "./parkingTicketModal";
import { useStore } from "@/store/store";
export default function ZoneCard({
  zone,
  gate,
  gateId,
  handleEnterParking,
  showTicketModal,
  setShowTicketModal,
}: {
  zone: Zone;
  gate: Gate;
  gateId: string;
  handleEnterParking: React.MouseEventHandler<HTMLButtonElement>;
  showTicketModal: boolean;
  setShowTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const subscriptionId = useStore((state) => state.subscriptionId);
  const { mutateAsync, data, isPending, error, isError } = useTicketCheckIn(
    zone.id,
    gateId
  );
  return (
    <Card
      className={`transition-all duration-200 hover:shadow-lg cursor-pointer border-primary/20 hover:border-primary/40 group ${
        zone.open ? "" : "opacity-60 cursor-not-allowed "
      }${
        !subscriptionId &&
        zone.availableForVisitors <= 0 &&
        "opacity-60 cursor-not-allowed"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{zone.name}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={zone.open ? "default" : "destructive"}>
              {zone.open ? "Open" : "Closed"}
            </Badge>
          </div>
        </div>
        <p className="text-lg text-muted-foreground capitalize">
          {zone.categoryId.split("_").at(-1)}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Occupancy Stats */}
        <div className="grid grid-cols-3  grid-rows-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Occupied</p>
            <p className="font-semibold text-red-600">{zone.occupied}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Free</p>
            <p className="font-semibold text-green-600">{zone.free}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Reserved</p>
            <p className="font-semibold text-yellow-600">{zone.reserved}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">
              Availability for Subscribers
            </p>
            <p className="font-semibold text-blue-600">
              {zone.availableForSubscribers}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Availability for visitors</p>
            <p className="font-semibold text-blue-600">
              {zone.availableForSubscribers}
            </p>
          </div>
        </div>

        {/* Rate Information */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">Normal Rate:</span>
          </div>
          <div className="text-right">
            <p className="font-semibold">${zone.rateNormal} / min</p>
          </div>
        </div>
        <div className="flex items-center justify-between  ">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">Special Rate:</span>
          </div>
          <div className="text-right">
            <p className="font-semibold">${zone.rateSpecial} / min</p>
          </div>
        </div>

        {/* Select Button */}
        <Button
          className={` w-full cursor-pointer  group-disabled:cursor-not-allowed ${
            isPending && "bg-slate-950 "
          }`}
          disabled={!zone.open || isPending || zone.availableForVisitors <= 0}
          onClick={async (e) => {
            await mutateAsync({
              gateId,
              zoneId: zone.id,
              type: subscriptionId ? "subscriber" : "visitor",
              subscriptionId: subscriptionId,
            });
            if (!isError) {
              handleEnterParking(e);
            }
          }}
        >
          {isPending ? (
            "Processing..."
          ) : (
            <>
              Go
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </>
          )}
        </Button>
        {isError && (
          <p className="text-sm text-red-600 text-center">{error?.message}</p>
        )}
      </CardContent>
      {data && (
        <ParkingTicketModal
          data={data}
          gate={gate}
          open={showTicketModal}
          setIsOpen={setShowTicketModal}
        />
      )}
    </Card>
  );
}
