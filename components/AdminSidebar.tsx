"use client";
import { navigation } from "@/lib/utils";
import { useAdminStore } from "@/store/adminStore";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function AdminSidebar() {
  const sidebarOpen = useAdminStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAdminStore((state) => state.setSidebarOpen);
  const activeTab = useAdminStore((state) => state.activeTab);
  const setActiveTab = useAdminStore((state) => state.setActiveTab);
  return (
    <aside className="flex min-h-screen ">
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r transition-transform duration-200 ease-in-out
          lg:relative lg:translate-x-0 lg:z-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden absolute right-0 top-1.5"
          onClick={() => setSidebarOpen()}
        >
          <X className="h-5 w-5" />
        </Button>
        <div className="flex h-full flex-col pt-16 md:pt-0">
          <nav className="flex-1 space-y-2 p-4 ">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="w-full justify-start gap-3 cursor-pointer lg:text-base"
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen();
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen()}
        />
      )}
    </aside>
  );
}
