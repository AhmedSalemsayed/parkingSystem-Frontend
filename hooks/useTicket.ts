import { useQuery } from "@tanstack/react-query";

export function useTicket(ticketId: string): {
  isFetching: boolean;
  ticket: Ticket;
  error: unknown;
  refetch: () => Promise<Ticket | undefined>;
  isError: boolean;
} {
  const {
    isFetching,
    data: ticket,
    error,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["Ticket", ticketId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/tickets/${ticketId}`
      );
      if (!response.ok) {
        throw new Error(
          (await response.json()).message || "Failed to fetch ticket"
        );
      }
      const data = await response.json();
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return {
    isFetching,
    ticket,
    error,
    refetch: async () => {
      const result = await refetch();
      return result.data as Ticket | undefined;
    },
    isError,
  };
}
