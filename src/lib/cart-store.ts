"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { rentDays } from "@/lib/format";

export type PurchaseMode = "buy" | "rent";

export interface CartItem {
  /** Unique line id: `${productId}::${mode}` */
  id: string;
  productId: string;
  name: string;
  image: string;
  /** e.g. "Fins", "Package", "BCD & Regulator" */
  category: string;
  mode: PurchaseMode;
  /** Buy price (IDR) or rent price per day (IDR) depending on mode. */
  unitPrice: number;
  quantity: number;
  /** ISO date strings — required for rent mode. */
  startDate?: string;
  endDate?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateRentDates: (id: string, startDate: string, endDate: string) => void;
  setOpen: (open: boolean) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const id = `${item.productId}::${item.mode}`;
          const existing = state.items.find((i) => i.id === id);
          let items;
          if (existing) {
            items = state.items.map((i) =>
              i.id === id
                ? { ...i, quantity: Math.min(99, i.quantity + item.quantity) }
                : i
            );
          } else {
            items = [...state.items, { ...item, id }];
          }
          return { items };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id ? { ...i, quantity: Math.min(99, quantity) } : i
                ),
        })),
      updateRentDates: (id, startDate, endDate) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, startDate, endDate } : i
          ),
        })),
      setOpen: (open) => set({ isOpen: open }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "bac-cart-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

/** Line total for a cart item. Rent is priced per selected day span. */
export function lineTotal(item: CartItem): number {
  if (item.mode === "rent") {
    const days = rentDays(item.startDate, item.endDate) ?? 1;
    return item.unitPrice * days * item.quantity;
  }
  return item.unitPrice * item.quantity;
}

/** True when a rent item is missing dates or has an invalid range. */
export function rentItemIncomplete(item: CartItem): boolean {
  if (item.mode !== "rent") return false;
  return rentDays(item.startDate, item.endDate) === null;
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + lineTotal(item), 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
