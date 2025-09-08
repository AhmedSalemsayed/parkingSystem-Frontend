import { useMutation } from "@tanstack/react-query";

export default function useSubscription() {
  const { isPending, mutateAsync, error, isError, reset } = useMutation({
    mutationKey: ["subscriptionVertifcation"],
    mutationFn: async (id: string) => {
      const response = await fetch(
        `http://localhost:3000/api/v1/subscriptions/${id}`
      );
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      const data = await response.json();
      return data;
    },
    onError: () => {
      setTimeout(() => reset(), 2000);
    },
  });
  return { isPending, mutateAsync, error, isError, reset };
}
