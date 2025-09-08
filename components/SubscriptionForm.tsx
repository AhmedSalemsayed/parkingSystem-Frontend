"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { useStore } from "@/store/store";
import useSubscription from "@/hooks/useSubscription";

export default function SubscriptionForm() {
  const setSubscriptionId = useStore((state) => state.setSubscriptionId);
  const { isPending, mutateAsync, error, isError } = useSubscription();

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get("subscriptionId") as string;
    await mutateAsync(id);
    if (!isError) {
      setSubscriptionId(id);
    }
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Subscription Lookup</CardTitle>
          <CardDescription>
            Enter your subscription ID to access your account details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subscription-id">Subscription ID</Label>
              <Input
                id="subscription-id"
                name="subscriptionId"
                type="text"
                placeholder="sub_1234567890abcdef"
                required
                className="font-mono placeholder:text-slate-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer "
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
            {isError && <p className="text-red-500">{error?.message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
