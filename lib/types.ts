type Gate = {
  id: string;
  name: string;
  zoneIds: string[];
  location: string;
};
type Zone = {
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

type Ticket = {
  id: string;
  type: "visitor" | "subscriber";
  zoneId: string;
  gateId: string;
  checkinAt: string;
  checkoutAt: string | null;
};
type TicketCheckInResponse = {
  ticket: Ticket;
  zoneState: Zone;
};
type Car = {
  plate: string;
  brand: string;
  model: string;
  color: string;
};
type CheckIn = {
  ticketId: string;
  zoneId: string;
  checkinAt: string;
};
type Subscription = {
  id: string;
  userName: string;
  active: boolean;
  category: string;
  cars: Car[];
  startsAt: string;
  expiresAt: string;
  currentCheckins: CheckIn[];
};
type BreakdownSegment = {
  from: string;
  to: string;
  hours: number;
  rateMode: string;
  rate: number;
  amount: number;
};

type CheckoutData = {
  ticketId: string;
  checkinAt: string;
  checkoutAt: string;
  durationHours: string;
  breakdown: BreakdownSegment[];
  amount: number;
  zoneState: Zone;
};
