import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import useVacations from "@/hooks/useVacations";

export default function AddVacation() {
  const { mutateAsync } = useVacations();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")! as string;
    const from = formData.get("from")! as string;
    const to = formData.get("to")! as string;
    mutateAsync({ name: name, from: from, to: to });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-base cursor-pointer">
          <PlusCircle />
          Add Vacation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-2">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue="EID EL Fitr" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="from">From</Label>
              <Input id="from" name="from" defaultValue="2025-07-01" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="To">To</Label>
              <Input id="To" name="To" defaultValue="2025-07-04" />
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
