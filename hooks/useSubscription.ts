import { Subscription } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

export default function useSubscription(): {
  isPending: boolean;
  getSubscription: (id: string) => Promise<Subscription>;
  error: any;
  isError: boolean;
  reset: () => void;
  subscriberData: Subscription;
} {
  const {
    isPending,
    mutateAsync: getSubscription,
    error,
    isError,
    reset,
    data: subscriberData,
  } = useMutation({
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
  return { isPending, getSubscription, error, isError, reset, subscriberData };
}
