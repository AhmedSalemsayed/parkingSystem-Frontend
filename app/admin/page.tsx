"use client";
import EmployeeScreen from "@/components/EmployeeScreen";
import { useAdminStore } from "@/store/adminStore";
import AdminSidebar from "@/components/AdminSidebar";
import ParkingStateReport from "@/components/ParkingStateReport";
import ControlPanel from "@/components/ControlPanel";

export default function page() {
  const activeTab = useAdminStore((state) => state.activeTab);

  return (
    <section className="flex">
      <AdminSidebar />
      {activeTab === "employees" && <EmployeeScreen />}
      {activeTab === "reports" && <ParkingStateReport />}
      {activeTab === "control" && <ControlPanel />}
    </section>
  );
}
