import { useParkingStateReport } from "@/hooks/useParkingStateReport";
import AdminZoneSummaryCards from "./AdminZoneSummaryCards";
import AdminZoneDetailsTable from "./AdminZoneDetailsTable";

export default function ParkingStateReport() {
  useParkingStateReport();
  return (
    <article className="flex-1 p-6 mx-auto max-w-7xl flex flex-col gap-5  overflow-x-hidden ">
      <AdminZoneSummaryCards />
      <AdminZoneDetailsTable />
    </article>
  );
}
