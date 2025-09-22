import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthState } from '../types';

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      setAuth: (token, user) => {
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      initialize: async () => {
        try {
          const storedState = localStorage.getItem('auth-storage');
          if (storedState) {
            const { state } = JSON.parse(storedState) as { state: AuthState };
            set({ user: state.user, token: state.token, isAuthenticated: !!state.token });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('auth-storage');
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

useAuthStore.getState().initialize();

export default useAuthStore;