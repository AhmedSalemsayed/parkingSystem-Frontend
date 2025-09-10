import { create } from "zustand";

type Store = {
  ticketId: string;
  setTicketId: (id: string) => void;
  plateMatch: boolean;
  setPlateMatch: (state: boolean) => void;
};

export const useCheckoutStore = create<Store>((set) => ({
  ticketId: "",
  setTicketId: (id) => {
    set({ ticketId: id });
  },
  plateMatch: true,
  setPlateMatch: (state) => {
    set({ plateMatch: state });
  },
}));
