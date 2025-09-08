import { create } from "zustand";

type Store = {
  subscriptionVerfied: boolean;
  verifySubscription: () => void;
};

export const useStore = create<Store>((set) => ({
  subscriptionVerfied: false,
  verifySubscription: () => {
    set({ subscriptionVerfied: true });
  },
}));
