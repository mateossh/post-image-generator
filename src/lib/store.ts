import { create } from "zustand";

import type { Dimension } from "./dimensions";

import { IMAGE_DIMENSIONS } from "./dimensions";

type Store = {
  content: string | null;
  setContent: (content: string) => void;

  footer: string | null;
  setFooter: (footer: string) => void;

  dimensions: Dimension | null;
  setDimensions: (dimensions: Dimension) => void;

  backgroundFile: File | null;
  setBackgroundFile: (file: File | null) => void;
};

const useStore = create<Store>()((set) => ({
  content: null,
  setContent: (content) => set({ content }),

  footer: null,
  setFooter: (footer) => set({ footer }),

  dimensions: IMAGE_DIMENSIONS[0],
  setDimensions: (dimensions) => set({ dimensions }),

  backgroundFile: null,
  setBackgroundFile: (file) => set({ backgroundFile: file }),
}));

export { useStore };
