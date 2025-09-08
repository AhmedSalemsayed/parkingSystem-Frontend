import { useMutation } from "@tanstack/react-query";

type props = {
  gateId: string;
  zoneId: string;
  type: "visitor" | "subscriber";
  subscriptionId?: string;
};

export default function useTicketCheckIn({
  gateId,
  zoneId,
  type = "visitor",
  subscriptionId,
}: props) {
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["checkInTicket"],
    mutationFn: async ({ gateId, zoneId, type, subscriptionId }: props) => {
      const response = await fetch(
        `http://localhost:3000/api/v1/tickets/checkin`,
        {
          method: "POST",
          body: JSON.stringify({ gateId, zoneId, type, subscriptionId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      return data;
    },
  });
  return { data, mutate, isPending };
}
