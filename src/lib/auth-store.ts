import { create } from 'zustand';

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  createdAt?: string;
}

interface AuthState {
  user: UserProfile | null;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const getInitialUser = (): UserProfile | null => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('pmt_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  return {
    user: getInitialUser(),
    login: (email: string, name?: string) => {
      const profile: UserProfile = {
        name: name || (email ? email.split('@')[0] : 'User'),
        email,
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('pmt_user_profile', JSON.stringify(profile));
      }
      set({ user: profile });
    },
    signup: (name: string, email: string) => {
      const profile: UserProfile = {
        name,
        email,
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('pmt_user_profile', JSON.stringify(profile));
      }
      set({ user: profile });
    },
    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pmt_user_profile');
      }
      set({ user: null });
    },
  };
});
