import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string; // Note: In production, never store plain passwords
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Track initialization state
  login: (user: User) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Initial loading state

  login: (user) => {
    localStorage.setItem("user", JSON.stringify({
      // Store only necessary user data
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
      // Never store password in localStorage
    }));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },

  initialize: async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        set({ user: parsedUser, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      localStorage.removeItem("user");
    } finally {
      set({ isLoading: false }); // Mark initialization complete
    }
  }
}));

// Initialize immediately when store is created
useAuthStore.getState().initialize();

export default useAuthStore;