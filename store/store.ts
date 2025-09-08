import { create } from "zustand";

type Store = {
  subscriptionId: string | null;
  setSubscriptionId: (id: string) => void;
};

export const useStore = create<Store>((set) => ({
  subscriptionId: null,
  setSubscriptionId: (id) => {
    set({ subscriptionId: id });
  },
}));
