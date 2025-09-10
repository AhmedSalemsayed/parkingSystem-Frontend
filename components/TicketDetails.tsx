import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Label } from "./ui/label";
import { formatTime } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useQueryClient } from "@tanstack/react-query";
import { useCheckoutStore } from "@/store/checkoutStore";

export default function TicketDetails() {
  const ticketId = useCheckoutStore((state) => state.ticketId);
  const queryClient = useQueryClient();
  const ticket = queryClient.getQueryCache().get(`[\"Ticket\",\"${ticketId}\"]`)
    ?.state.data as Ticket;
  if (!ticket) return;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Ticket Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Label className="text-muted-foreground">Ticket ID</Label>
            <p className="font-mono">{ticket.id}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Gate ID</Label>
            <p className="font-mono font-semibold">{ticket.gateId}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Entry Time</Label>
            <p>{formatTime(ticket.checkinAt)}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Zone ID</Label>
            <p>{ticket.zoneId} </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-muted-foreground">Type</Label>
          <Badge variant={ticket.type === "visitor" ? "default" : "secondary"}>
            {ticket.type === "visitor" ? "visitor" : "Subscriber"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
