import { ActiveTab } from "@/lib/types";
import { create } from "zustand";

type AdminStore = {
  sidebarOpen: boolean;
  setSidebarOpen: () => void;
  activeTab: ActiveTab;
  setActiveTab: (activeTab: ActiveTab) => void;
  auditLog: string[];
  setAuditLog: (value: string) => void;
};

export const useAdminStore = create<AdminStore>((set) => ({
  sidebarOpen: true,
  auditLog: [],
  activeTab: "employees",
  setSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActiveTab: (value) => set({ activeTab: value }),
  setAuditLog: (value) =>
    set((state) => ({
      auditLog: [...state.auditLog, value],
    })),
}));
