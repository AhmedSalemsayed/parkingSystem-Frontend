import { useQuery } from "@tanstack/react-query";

export function useGates(): {
  isLoading: boolean;
  Gates: Gate[];
  error: unknown;
} {
  const {
    isLoading,
    data: Gates,
    error,
  } = useQuery({
    queryKey: ["Gates"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/v1/master/gates`);
      const data = await response.json();
      return data;
    },
  });

  return { isLoading, Gates, error };
}
