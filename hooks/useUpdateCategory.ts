import { Category } from "@/lib/types";
import { useAdminStore } from "@/store/adminStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type props = {
  categoryId: string;
  rateNormal: number;
  rateSpecial: number;
  name?: string;
  description?: string;
};

export default function useUpdateCategory() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token"))
    ?.split("=")
    .at(1);
  const setAuditLog = useAdminStore((state) => state.setAuditLog);
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["update category"],
    mutationFn: async ({
      categoryId,
      rateNormal,
      rateSpecial,
      name,
      description,
    }: props) => {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/categories/${categoryId}`,
        {
          method: "PUT",
          body: JSON.stringify({ rateNormal, rateSpecial, name, description }),
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
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      toast.success(`Category ${data.name} updated successfully!`);
      console.log(data);
    },
  });
  return { mutateAsync, isPending };
}
