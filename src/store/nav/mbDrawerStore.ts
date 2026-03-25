import { create } from "zustand";

interface MBDrawerStore {
  isMobileMenuOpen: boolean;
  setToggleMobileMenu: () => void;
  setCloseMobileMenu: () => void;
}

export const useMBDrawerStore = create<MBDrawerStore>((set) => ({
  isMobileMenuOpen: false,
  setToggleMobileMenu: () => set(s => ({isMobileMenuOpen: !s.isMobileMenuOpen})),
  setCloseMobileMenu: () => set({isMobileMenuOpen: false})
}));
