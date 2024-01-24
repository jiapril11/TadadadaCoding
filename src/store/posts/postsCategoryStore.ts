import { create } from "zustand";

interface PostsCategoryStore {
  currentCategory: string;
  setCategory: (newCategory: string) => void;
}

export const usePostsCategoryStore = create<PostsCategoryStore>((set) => ({
  currentCategory: "All",
  setCategory: (newCategory) => set({ currentCategory: newCategory }),
}));
