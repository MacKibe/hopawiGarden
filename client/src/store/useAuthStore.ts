// src/store/useAuthStore.ts
import { create } from 'zustand'

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user: user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

export default useAuthStore
