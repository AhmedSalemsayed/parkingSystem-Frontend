import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type props = {
  weekDay: number;
  from: string;
  to: string;
};

export default function useUpdateCategory() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token"))
    ?.split("=")
    .at(1);
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create Rush Hour"],
    mutationFn: async ({ weekDay, from, to }: props) => {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/rush-hours`,
        {
          method: "POST",
          body: JSON.stringify({ weekDay, from, to }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          (await response.json()).message || "Error creating new Rush Hour"
        );
      }
      const data = await response.json();

      return data;
    },
    onSuccess: (data) => {
      toast.success(`Rush Hour Created successfully!`);
    },
  });
  return { mutateAsync, isPending };
}
