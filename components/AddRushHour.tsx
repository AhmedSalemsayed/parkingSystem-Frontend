import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import useRushHours from "@/hooks/useRushHours";

export default function AddRushHour() {
  const { mutateAsync } = useRushHours();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Convert FormData → typed object
    const object = {
      weekDay: Number(formData.get("weekDay")), // convert from string
      from: String(formData.get("from")),
      to: String(formData.get("to")),
    };

    // const weekDay = formData.get("weekDay")!;
    // const from = formData.get("from")! as string;
    // const to = formData.get("to")! as string;
    // mutateAsync({ weekDay: +weekDay, from: from, to: to });
    mutateAsync(object);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm md:text-base cursor-pointer">
          <PlusCircle />
          Add Rush Hour
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Rush Hour</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-2">
            <div className="grid gap-3">
              <Label htmlFor="name-1">WeekDay</Label>
              <Input id="weekDay" name="weekDay" defaultValue={1} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="from">From</Label>
              <Input id="from" name="from" defaultValue="23:00" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="to">To</Label>
              <Input id="to" name="to" defaultValue="24:00" />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
