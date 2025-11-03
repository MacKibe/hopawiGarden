import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem, CartState } from "../types/index";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      // Add or update item in cart
      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.product_id === item.product_id);
          
          if (existingItem) {
            // Update quantity if item exists
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id
                  ? { 
                      ...i, 
                      quantity: i.quantity + item.quantity
                    }
                  : i
              )
            };
          }
          // Add new item
          return { 
            items: [...state.items, { ...item, id: String(item.product_id) }],
           };
        });
      },

      // Remove item by ID
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product_id !== id)
        }));
      },

      // Update specific item quantity
      updateQuantity: (id: string, quantity: number) => {
        if (quantity < 1) return;
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === id 
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
          (total, item) => total + (item.price * item.quantity),
          0
        ),

      // Optional helper method
      getItem: (id: string) => get().items.find((item) => item.product_id === id)
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
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