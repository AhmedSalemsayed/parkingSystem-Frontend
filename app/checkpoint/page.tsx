"use client";
import PricingBreakdown from "@/components/PricingBreakdown";
import SubscriberCard from "@/components/SubscriberCard";
import SubscriptionForm from "@/components/SubscriptionForm";
import TicketDetails from "@/components/TicketDetails";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTicket } from "@/hooks/useTicket";
import useTicketCheckOut from "@/hooks/useTicketCheckOut";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useStore } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Car,
  CheckCircle,
  DollarSign,
  Loader2,
  XCircle,
} from "lucide-react";
import React from "react";

export default function page() {
  const ticketId = useCheckoutStore((state) => state.ticketId);
  const setTicketId = useCheckoutStore((state) => state.setTicketId);
  const {
    refetch,
    ticket,
    isFetching,
    error: getTicketError,
    isError,
  } = useTicket(ticketId!);
  const {
    mutateAsync: checkout,
    isPending: isCheckingout,
    data: checkoutData,
    error: checkoutError,
  } = useTicketCheckOut(ticketId!);
  const subscriptionId = useStore((state) => state.subscriptionId);
  const setSubscriptionId = useStore((state) => state.setSubscriptionId);
  const queryClient = useQueryClient();
  const subscriptionData = queryClient.getMutationCache().getAll().at(0)?.state
    ?.data as Subscription;

  const plateMatch = useCheckoutStore((state) => state.plateMatch);
  const setPlateMatch = useCheckoutStore((state) => state.setPlateMatch);

  const handleLookup = async () => {
    //fetch the ticket details
    const result = await refetch();
    //check if the ticket type is visitor
    if (result && result?.type === "visitor") {
      checkout({ ticketId, forceConvertToVisitor: false });
    }
  };
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Parking Checkpoint
          </h1>
          <p className="text-muted-foreground">
            Scan or enter ticket ID to process checkout
          </p>
        </div>

        {/* Ticket Lookup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Ticket Lookup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-2">
                <Label htmlFor="ticketId">Ticket ID</Label>
                <Input
                  id="ticketId"
                  placeholder="Enter ticket ID or scan QR code"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleLookup}
                  disabled={isFetching || isCheckingout}
                >
                  {isFetching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Lookup"
                  )}
                </Button>
              </div>
            </div>

            {isError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {getTicketError.message || checkoutError?.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Ticket Details */}
        {ticket && (
          <div className="grid gap-6 md:grid-cols-2">
            <TicketDetails />
            {ticket.type === "visitor" && <PricingBreakdown />}
            {ticket.type === "subscriber" && subscriptionId ? (
              <SubscriberCard />
            ) : (
              ticket.type === "subscriber" && <SubscriptionForm />
            )}
          </div>
        )}

        {/* Subscription Verification */}
        {subscriptionId && (
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Verification</CardTitle>
              <p className="text-sm text-muted-foreground">
                Verify the vehicle plate matches one of the registered
                subscription cars
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {subscriptionData?.cars?.map((car) => (
                  <div
                    key={car.plate}
                    className={`p-3 rounded-lg border-2 transition-colors `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono font-semibold">{car.plate}</p>
                        <p className="text-sm text-muted-foreground">
                          {car.color} {car.model}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPlateMatch(true)}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Plate Matches
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPlateMatch(false)}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Plate Mismatch
                </Button>
              </div>

              {plateMatch === false && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Plate mismatch detected. You can convert this to a visitor
                    checkout.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Checkout Actions */}
        {subscriptionId && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                {plateMatch === false ? (
                  <Button
                    onClick={async () => {
                      await checkout({ ticketId, forceConvertToVisitor: true });
                      setTicketId("");
                      setSubscriptionId("");
                      queryClient.clear();
                    }}
                    disabled={isCheckingout}
                    className="flex-1"
                    variant="destructive"
                  >
                    {isCheckingout ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <DollarSign className="h-4 w-4 mr-2" />
                    )}
                    Convert to Visitor & Checkout
                  </Button>
                ) : (
                  <Button
                    onClick={async () => {
                      await checkout({
                        ticketId,
                        forceConvertToVisitor: false,
                      });
                      setTicketId("");
                      setSubscriptionId("");
                      queryClient.clear();
                    }}
                    disabled={isCheckingout}
                    className="flex-1"
                  >
                    {isCheckingout ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <DollarSign className="h-4 w-4 mr-2" />
                    )}
                    Process Checkout
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    setTicketId("");
                    setSubscriptionId("");
                    setPlateMatch(true);
                    queryClient.clear();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
