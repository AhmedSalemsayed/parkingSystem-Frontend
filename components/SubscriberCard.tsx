import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { UserStar } from "lucide-react";

export default function SubscriberCard() {
  const queryClient = useQueryClient();
  const subscriptionData = queryClient.getMutationCache().getAll().at(0)?.state
    ?.data as Subscription;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserStar className="h-5 w-5" />
          Subscriber Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-6">
          <div className="flex justify-between items-center text-md">
            <span className="font-medium capitalize">name</span>
            <span className="font-medium capitalize">
              {subscriptionData.userName}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium capitalize">Category</span>
            <span className="font-medium capitalize">
              {subscriptionData.category.split("_").at(-1)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium ">No. of Cars</span>
            <span className="font-medium capitalize">
              {subscriptionData.cars.length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
