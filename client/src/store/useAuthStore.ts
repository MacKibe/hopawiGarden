// src/store/useAuthStore.ts
import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user: "Kibe", isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

export default useAuthStore
