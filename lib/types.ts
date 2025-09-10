import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type Gate = {
  id: string;
  name: string;
  zoneIds: string[];
  location: string;
};
export type Zone = {
  id: string;
  name: string;
  categoryId: string;
  gateIds: string[];
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  rateNormal: number;
  rateSpecial: number;
  open: boolean;
};

export type Ticket = {
  id: string;
  type: "visitor" | "subscriber";
  zoneId: string;
  gateId: string;
  checkinAt: string;
  checkoutAt: string | null;
};
export type TicketCheckInResponse = {
  ticket: Ticket;
  zoneState: Zone;
};
export type Car = {
  plate: string;
  brand: string;
  model: string;
  color: string;
};
export type CheckIn = {
  ticketId: string;
  zoneId: string;
  checkinAt: string;
};
export type Subscription = {
  id: string;
  userName: string;
  active: boolean;
  category: string;
  cars: Car[];
  startsAt: string;
  expiresAt: string;
  currentCheckins: CheckIn[];
};
export type BreakdownSegment = {
  from: string;
  to: string;
  hours: number;
  rateMode: string;
  rate: number;
  amount: number;
};

export type CheckoutData = {
  ticketId: string;
  checkinAt: string;
  checkoutAt: string;
  durationHours: string;
  breakdown: BreakdownSegment[];
  amount: number;
  zoneState: Zone;
};
export type ParkingStateReport = {
  zoneId: string;
  name: string;
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  subscriberCount: number;
  open: boolean;
}[];
export type ActiveTab = "employees" | "reports" | "control";
export type NavigationItem = {
  id: ActiveTab;
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
