"use client";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/store/adminStore";
import { Menu } from "lucide-react";

export default function AdminHeader() {
  const sidebarOpen = useAdminStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAdminStore((state) => state.setSidebarOpen);
  return (
    <header className="border-b bg-card w-full">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen()}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl  lg:text-2xl font-semibold text-foreground">
            Admin Dashboard
          </h1>
        </div>
        <div className="text-sm hidden md:block md:text-xl lg:text-2xl text-muted-foreground">
          Parking Management System
        </div>
      </div>
    </header>
  );
}
