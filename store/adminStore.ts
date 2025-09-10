import { ActiveTab } from "@/lib/types";
import { create } from "zustand";

type AdminStore = {
  sidebarOpen: boolean;
  setSidebarOpen: () => void;
  activeTab: ActiveTab;
  setActiveTab: (activeTab: ActiveTab) => void;
};

export const useAdminStore = create<AdminStore>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  activeTab: "employees",
  setActiveTab: (value) => set({ activeTab: value }),
}));
