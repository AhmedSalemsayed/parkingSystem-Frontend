import { DollarSign } from "lucide-react";
import { Card } from "./ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { Category } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import useUpdateCategory from "@/hooks/useUpdateCategory";
export default function CategoryRateManagement() {
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryCache().get('["Categories"]')?.state
    ?.data as Category[];
  const { mutateAsync, isPending } = useUpdateCategory();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const normalRate = formData.get("normalRate") as string;
    const specialRate = formData.get("specialRate") as string;
    const name = formData.get("name") as string;
    const categoryId = formData.get("categoryId")! as string;
    mutateAsync({
      categoryId: categoryId,
      rateSpecial: +specialRate,
      rateNormal: +normalRate,
      name: name,
    });
  }
  if (!categories) return;
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Category Rates</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium">Category</th>
              <th className="text-left py-3 px-4 font-medium">Normal Rate</th>
              <th className="text-left py-3 px-4 font-medium">Special Rate</th>
              <th className="text-left py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">{category.name}</td>
                <td className="py-3 px-4">{category.rateNormal}</td>
                <td className="py-3 px-4">{category.rateSpecial}</td>
                <td className="py-3 px-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="cursor-pointer">
                        Update
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="grid gap-2">
                        <form onSubmit={handleSubmit}>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="normalRate">Normal Rate</Label>
                            <Input
                              id="normalRate"
                              name="normalRate"
                              defaultValue={category.rateNormal}
                              className="col-span-1 h-8"
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="specialRate">Special Rate</Label>
                            <Input
                              id="specialRate"
                              name="specialRate"
                              defaultValue={category.rateSpecial}
                              className="col-span-1 h-8"
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              name="name"
                              defaultValue={category.name}
                              className="col-span-1 h-8"
                            />
                          </div>
                          <div className="  items-center gap-4 hidden">
                            <Label htmlFor="categoryId">categoryId</Label>
                            <Input
                              id="categoryId"
                              name="categoryId"
                              defaultValue={category.id}
                              className="col-span-1 h-8"
                              hidden
                            />
                          </div>
                          <Button className="w-2/3 mx-auto block mt-2">
                            Submit
                          </Button>
                        </form>
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
