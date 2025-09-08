import { useMutation } from "@tanstack/react-query";

type props = {
  gateId: string;
  zoneId: string;
  type: "visitor" | "subscriber";
  subscriptionId: string | null;
};

export default function useTicketCheckIn(zoneId: string, gateId: string) {
  const { data, mutateAsync, isPending, error, isError, reset } = useMutation({
    mutationKey: ["checkInTicket", gateId, zoneId],
    mutationFn: async ({ gateId, zoneId, type, subscriptionId }: props) => {
      const response = await fetch(
        `http://localhost:3000/api/v1/tickets/checkin`,
        {
          method: "POST",
          body: JSON.stringify({ gateId, zoneId, type, subscriptionId }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(
          (await response.json()).message || "Error checking in ticket"
        );
      }
      const data = await response.json();

      return data;
    },
    onError: () => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { data, mutateAsync, isPending, error, isError };
}
