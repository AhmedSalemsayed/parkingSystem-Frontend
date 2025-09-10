import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
type props = {
  ticketId: string;
  forceConvertToVisitor: boolean;
};

export default function useTicketCheckOut(ticketId: string): {
  data: CheckoutData;
  mutateAsync: (props: props) => Promise<CheckoutData>;
  isPending: boolean;
  error: Error | null;
  isError: boolean;
} {
  const { data, mutateAsync, isPending, error, isError } = useMutation({
    mutationKey: ["checkOutTicket", ticketId],
    mutationFn: async ({ ticketId, forceConvertToVisitor = false }: props) => {
      const response = await fetch(
        `http://localhost:3000/api/v1/tickets/checkout`,
        {
          method: "POST",
          body: JSON.stringify({ ticketId, forceConvertToVisitor }),
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
    onSuccess: () => {
      toast.success("Checked out successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { data, mutateAsync, isPending, error, isError };
}
