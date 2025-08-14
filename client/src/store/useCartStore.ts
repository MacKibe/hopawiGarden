import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartState } from "../types/cart";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      // Add or update item in cart
      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            // Update quantity if item exists
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { 
                      ...i, 
                      quantity: i.quantity + item.quantity
                    }
                  : i
              )
            };
          }
          // Add new item
          return { items: [...state.items, item] };
        });
      },

      // Remove item by ID
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));
      },

      // Update specific item quantity
      updateQuantity: (id: string, quantity: number) => {
        if (quantity < 1) return;
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id 
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),

      // Calculate total number of items
      totalItems: () => 
        get().items.reduce((total, item) => total + item.quantity, 0),

      // Calculate total price
      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.itemPrice * item.quantity),
          0
        ),

      // Optional helper method
      getItem: (id: string) => get().items.find((item) => item.id === id)
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
      // Optional: Versioning for future migrations
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migration logic from v0 to v1
        }
        return persistedState as CartState;
      }
    }
  )
);