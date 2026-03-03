import { create } from "zustand";

type Store = {
  content: string | null;
  setContent: (content: string) => void;
};

const useStore = create<Store>()((set) => ({
  content: null,
  setContent: (content) => set({ content }),
}));

export { useStore };
