import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatTime = (isoString: string) => {
  return new Date(isoString).toLocaleString();
};

export const formatCurrency = (amount: number) => {
  return `$${amount?.toFixed(2)}`;
};
