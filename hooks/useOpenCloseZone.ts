import { useAdminStore } from "@/store/adminStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type props = {
  zoneId: string;
  zoneState: boolean;
};

export default function useOpenCloseZone() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token"))
    ?.split("=")
    .at(1);
  const setAuditLog = useAdminStore((state) => state.setAuditLog);
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["open-close zone"],
    mutationFn: async ({ zoneId, zoneState }: props) => {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/zones/${zoneId}/open`,
        {
          method: "PUT",
          body: JSON.stringify({ open: !zoneState }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
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
    onSuccess: (data) => {
      // Invalidate any queries with this key
      queryClient.invalidateQueries({ queryKey: ["ParkingStateReport"] });
      const zoneName = data.zoneId.split("_")?.at(1).toUpperCase();
      toast.success(
        `Zone ${zoneName} ${!data.open ? "Closed" : "Opened"} successfully!`
      );
    },
  });
  return { mutateAsync, isPending };
}
