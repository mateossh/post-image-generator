import { create } from "zustand";

import type { Dimension } from "./dimensions";

import { IMAGE_DIMENSIONS } from "./dimensions";

type Store = {
  content: string | null;
  setContent: (content: string) => void;

  dimensions: Dimension | null;
  setDimensions: (dimensions: Dimension) => void;
};

const useStore = create<Store>()((set) => ({
  content: null,
  setContent: (content) => set({ content }),

  dimensions: IMAGE_DIMENSIONS[0],
  setDimensions: (dimensions: Dimension) => set({ dimensions }),
}));

export { useStore };
