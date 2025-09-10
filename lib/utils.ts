import { clsx, type ClassValue } from "clsx";
import { BarChart3, Settings, Users } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { NavigationItem, ParkingStateReport } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatTime = (isoString: string) => {
  return new Date(isoString).toLocaleString();
};

export const formatCurrency = (amount: number) => {
  return `$${amount?.toFixed(2)}`;
};

export const navigation: NavigationItem[] = [
  { id: "employees", name: "Employees", icon: Users },
  { id: "reports", name: "Parking State Report", icon: BarChart3 },
  { id: "control", name: "Control Panel", icon: Settings },
];
export const getOccupancyRate = (zone: any) => {
  return Math.round((zone.occupied / zone.totalSlots) * 100);
};

export const getStatusColor = (zone: any) => {
  const rate = getOccupancyRate(zone);
  if (!zone.open) return "bg-muted text-muted-foreground";
  if (rate >= 90) return "bg-destructive text-destructive-foreground";
  if (rate >= 70) return "bg-yellow-500 text-white";
  return "bg-primary text-primary-foreground";
};
