import { useParkingStateReport } from "@/hooks/useParkingStateReport";
import ZoneManagementCard from "./ZoneManagementCard";
import useCategories from "@/hooks/useCategories";
import CategoryRateManagement from "./CategoryRateManagement";
import AddRushHour from "./AddRushHour";
import AddVacation from "./AddVacation";

export default function ControlPanel() {
  useParkingStateReport();
  useCategories();
  return (
    <article className="flex-1 p-6 mx-auto max-w-7xl flex flex-col gap-5">
      <div className="flex  items-center justify-between">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
            Control Panel
          </h2>
          <p className="text-muted-foreground">
            Manage zones, rates, and scheduling
          </p>
        </div>
        <div className="flex gap-4 ">
          <AddVacation />
          <AddRushHour />
        </div>
      </div>
      <ZoneManagementCard />
      <CategoryRateManagement />
    </article>
  );
}
