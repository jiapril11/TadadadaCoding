import { create } from "zustand";

interface ViewStore {
  view: string;
  changeToGridView: () => void;
  changeToListView: () => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  view: "grid",
  changeToGridView: () => set({ view: "grid" }),
  changeToListView: () => set({ view: "list" }),
}));
