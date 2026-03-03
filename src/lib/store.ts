import { create } from "zustand";
import { IMAGE_DIMENSIONS } from "./dimensions";
import type { Dimension } from "./dimensions";

type Store = {
  content: string | null;
  setContent: (content: string) => void;

  dimensions: Dimension | null;
  setDimensions: (dimensions: Dimension) => void;
};

const useStore = create<Store>()((set) => ({
  content: null,
  setContent: (content) => set({ content }),

  dimensions: null,
  setDimensions: (dimensions: Dimension) => set({ dimensions }),
}));

useStore.setState({ dimensions: IMAGE_DIMENSIONS[0] })

export { useStore };
