'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      token: null,
      isHydrated: false,

      login: (user, token) => set({ currentUser: user, token }),
      logout: () => set({ currentUser: null, token: null }),
      setHydrated: (value) => set({ isHydrated: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
