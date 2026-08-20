import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Address } from "@/types/order";

interface AddressState {
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Address) => void;
  removeAddress: (id: string) => void;
  clearAddresses: () => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [],

      addAddress: (address) => {
        set((state) => ({
          addresses: [...state.addresses, address],
        }));
      },

      updateAddress: (id, address) => {
        set((state) => ({
          addresses: state.addresses.map((item) =>
            item.id === id ? address : item,
          ),
        }));
      },

      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((item) => item.id !== id),
        }));
      },

      clearAddresses: () => {
        set({ addresses: [] });
      },
    }),
    {
      name: "corevault-addresses",
    },
  ),
);
