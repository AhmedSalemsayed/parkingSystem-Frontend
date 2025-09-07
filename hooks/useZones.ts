import { useQuery } from "@tanstack/react-query";

export function useZones(gateId: string): {
  isLoading: boolean;
  Zones: Zone[];
  error: unknown;
} {
  const {
    isLoading,
    data: Zones,
    error,
  } = useQuery({
    queryKey: ["Zones", gateId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/master/zones?gateId=${gateId}`
      );
      const data = await response.json();
      return data;
    },
  });

  return { isLoading, Zones, error };
}
