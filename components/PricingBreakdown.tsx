import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Separator } from "./ui/separator";
import { formatCurrency } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export default function PricingBreakdown() {
  const queryClient = useQueryClient();
  const checkoutData = queryClient.getMutationCache().getAll().at(0)?.state
    .data as CheckoutData;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Pricing Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {checkoutData?.breakdown?.map((segment, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <span className="font-medium capitalize">
                  {segment?.rateMode}
                </span>
                <span className="text-muted-foreground ml-2">
                  ({segment?.hours}h × {formatCurrency(segment?.rate)})
                </span>
              </div>
              <span className="font-mono">
                {formatCurrency(segment?.amount)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total Amount</span>
          <span className="font-mono">
            {formatCurrency(checkoutData?.amount)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
