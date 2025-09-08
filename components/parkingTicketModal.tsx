"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Ticket, Printer } from "lucide-react";
import { useStore } from "@/store/store";

export function ParkingTicketModal({
  data,
  gate,
  open,
  setIsOpen,
}: {
  data: TicketCheckInResponse;
  gate: Gate;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handlePrint = () => {
    window.print();
  };
  const subscriptionId = useStore((state) => state.subscriptionId);
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const { date, time } = formatDateTime(data?.ticket.checkinAt);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="print-hidden">
          <DialogTitle className="text-center text-xl font-bold text-primary">
            Parking Ticket Preview
          </DialogTitle>
        </DialogHeader>

        <Card className="parking-ticket border-2 border-border bg-card ">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-card-foreground tracking-wide">
                PARKING TICKET
              </h1>
            </div>

            <Separator className="border-border" />

            {/* Ticket ID Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Ticket ID
                </span>
              </div>
              <div className="text-3xl font-bold text-card-foreground font-mono tracking-wider">
                {data?.ticket.id} /{" "}
                {subscriptionId ? subscriptionId : "Visitor"}
              </div>
            </div>

            <Separator className="border-border" />

            {/* Check-in Time Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Check-in Time
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-semibold text-foreground">
                  {date}
                </div>
                <div className="text-xl font-bold text-card-foreground">
                  {time}
                </div>
              </div>
            </div>

            <Separator className="border-border" />

            {/* Zone/Gate Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Location Details
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Zone
                  </div>
                  <div className="text-lg font-semibold text-card-foreground">
                    {data?.zoneState.name}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Gate
                  </div>
                  <div className="text-lg font-semibold text-card-foreground">
                    {gate?.name}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="border-border" />

            {/* Footer */}
            <div className="text-center space-y-2 text-xs text-muted-foreground">
              <p className="font-medium">Keep this ticket for your records</p>
              <p>For inquiries, contact parking services</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center print-hidden">
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print Ticket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
