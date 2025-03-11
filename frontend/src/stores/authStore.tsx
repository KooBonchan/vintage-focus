import { create } from 'zustand';
import axios from 'axios';
import { MemberResponse } from '@/types/response';

interface AuthState {
  user: MemberResponse | null;
  accessToken: string | null;
  hasLoggedInBefore: boolean;
  setAuth: (user: MemberResponse, token: string) => void;
  clearAuth: () => void;
  fetchUser: (token: string) => Promise<void>;
  setUser: (user: MemberResponse) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  hasLoggedInBefore: false,

  // Action to set user and token
  setAuth: (user: MemberResponse, token: string) =>
    set({ user, accessToken: token, hasLoggedInBefore: true }),

  // Action to clear auth state (e.g., on logout)
  clearAuth: () => set({ user: null, accessToken: null, hasLoggedInBefore: false }),

  // Action to fetch user profile and update store
  fetchUser: async (token: string) => {
    try {
      const response = await axios.get<MemberResponse>('http://localhost:8094/api/auth/user', {
        headers: { Authorization: token },
      });
      const user = response.data;
      set({ user, accessToken: token }); // Update store with fetched user and token
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ user: null, accessToken: null }); // Clear store on error
      throw error; // Re-throw error to handle it in the calling component
    }
  },

  setUser: (user: MemberResponse) => set({user})
}));

export default useAuthStore;