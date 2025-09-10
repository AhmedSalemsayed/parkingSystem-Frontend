import { ParkingStateReport } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useParkingStateReport(): {
  isLoading: boolean;
  ParkingStateReport: ParkingStateReport;
  error: unknown;
  isError: boolean;
} {
  const {
    isLoading,
    data: ParkingStateReport,
    error,
    isError,
  } = useQuery({
    queryKey: ["ParkingStateReport"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/reports/parking-state`
      );
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      const data = await response.json();
      return data;
    },
  });

  return { isLoading, ParkingStateReport, error, isError };
}
