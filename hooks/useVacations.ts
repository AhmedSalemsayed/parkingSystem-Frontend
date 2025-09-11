import { useAdminStore } from "@/store/adminStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type props = {
  name: string;
  from: string;
  to: string;
};

export default function useUpdateCategory() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token"))
    ?.split("=")
    .at(1);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create vacation"],
    mutationFn: async ({ name, from, to }: props) => {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/vacations`,
        {
          method: "POST",
          body: JSON.stringify({ name, from, to }),
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
    onSuccess: () => {
      toast.success(`Vacation  Created successfully!`);
    },
  });
  return { mutateAsync, isPending };
}
