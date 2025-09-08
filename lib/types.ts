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
  type: string;
  zoneId: string;
  gateId: string;
  checkinAt: string;
  checkoutAt: string | null;
};
type TicketCheckInResponse = {
  ticket: Ticket;
  zoneState: Zone;
};
