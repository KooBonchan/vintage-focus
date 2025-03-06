import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  hasLoggedinBefore: false,

  setAuth: (user, token: string) =>
    set({ user, accessToken: token, hasLoggedInBefore: true }),

  clearAuth: () => set({ user: null, accessToken: null, hasLoggedInBefore: false }),

  fetchUser: (token) =>
    axios.get('http://localhost:8094/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(console.log)
      .catch(console.error)
  ,
}));

export default useAuthStore;