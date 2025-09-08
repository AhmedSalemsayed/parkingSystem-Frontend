"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wifi, WifiOff, Users, Car } from "lucide-react";
import { useEffect, useState, use } from "react";
import ZoneCard from "@/components/ZoneCard";
import { useZones } from "@/hooks/useZones";
import { useGates } from "@/hooks/useGates";
import LiveClock from "@/components/LiveClock";
import { getWebSocket } from "@/lib/ws-client";
import { GateAnimation } from "@/components/GateAnimation";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import SubscriptionForm from "@/components/SubscriptionForm";

export default function page({
  params,
}: {
  params: Promise<{ gateId: string }>;
}) {
  const { gateId } = use(params);
  const queryClient = useQueryClient();
  const subscriptionId = useStore((state) => state.subscriptionId);
  const { Zones, isLoading: isLoadingZones } = useZones(gateId);
  const { Gates, isLoading: isLoadingGates } = useGates();
  const requiredGate = Gates?.find((gate) => gate.id === gateId)!;
  const [wsConnected, setWsConnected] = useState(false);
  const [showGateAnimation, setShowGateAnimation] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"visitor" | "subscriber">(
    "visitor"
  );
  const handleEnterParking = () => {
    setShowGateAnimation(true);
  };
  const handleGateAnimationComplete = () => {
    setShowGateAnimation(false);
    setShowTicketModal(true);
  };

  useEffect(() => {
    const socket = getWebSocket();
    socket.onopen = () => {
      setWsConnected(true);
      socket.send(
        JSON.stringify({ type: "subscribe", payload: { gateId: gateId } })
      );
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "zone-update") {
        const updatedZone = message.payload;
        // Update the specific zone in the React Query cache
        queryClient.setQueryData(["Zones", gateId], (oldData: Zone[]) => {
          if (!oldData) return oldData;
          return oldData.map((zone: Zone) =>
            zone.id === updatedZone.id ? updatedZone : zone
          );
        });
      }
    };
  }, []);

  if (isLoadingGates || isLoadingZones) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Gate information...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {requiredGate?.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Gate no.{requiredGate?.id.slice(-1)}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {wsConnected ? (
                <Wifi className="h-4 w-4 text-green-500 " />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-sm ${
                  wsConnected ? "text-green-500" : "text-red-500"
                }`}
              >
                {wsConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <LiveClock />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "visitor" | "subscriber")
        }
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger
            value="visitor"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Users className="h-4 w-4" />
            Visitor
          </TabsTrigger>
          <TabsTrigger
            value="subscriber"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Car className="h-4 w-4" />
            Subscriber
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {activeTab === "visitor" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Zones.map((zone) => (
                <ZoneCard
                  key={zone.id}
                  zone={zone}
                  gate={requiredGate}
                  gateId={gateId}
                  handleEnterParking={handleEnterParking}
                  showTicketModal={showTicketModal}
                  setShowTicketModal={setShowTicketModal}
                />
              ))}
            </div>
          ) : subscriptionId ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Zones.map((zone) => (
                <ZoneCard
                  key={zone.id}
                  zone={zone}
                  gate={requiredGate}
                  gateId={gateId}
                  handleEnterParking={handleEnterParking}
                  showTicketModal={showTicketModal}
                  setShowTicketModal={setShowTicketModal}
                />
              ))}
            </div>
          ) : (
            <SubscriptionForm />
          )}
        </TabsContent>
      </Tabs>
      <GateAnimation
        isVisible={showGateAnimation}
        onComplete={handleGateAnimationComplete}
      />
    </div>
  );
}
