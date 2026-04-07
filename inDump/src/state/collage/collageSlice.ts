import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ElementsNode } from "../../types/elementType";

type CollageStyle = "Grid" | "PostCard";

interface CollageState {
  images: string[];
  size: { width: number; height: number };
  collageStyle: CollageStyle;
  selectedElementIds: string[] | null;
  elements: {
    past: ElementsNode[][];
    present: ElementsNode[];
    future: ElementsNode[][];
  };
  isInitialStyleSet: boolean;
}

const initialState: CollageState = {
  images: [],
  size: { width: 0, height: 0 },
  collageStyle: "Grid",
  selectedElementIds: null,
  elements: {
    past: [],
    present: [],
    future: [],
  },
  isInitialStyleSet: false,
};

// createSlice
const collageSlice = createSlice({
  initialState,
  name: "collage",
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.images.push(action.payload);
    },
    setSize: (
      state,
      action: PayloadAction<{ width: number; height: number }>,
    ) => {
      state.size = action.payload;
    },
    setStyle: (state, action: PayloadAction<CollageStyle>) => {
      state.collageStyle = action.payload;
    },
    setSelectedElementIds: (state, action: PayloadAction<string[] | null>) => {
      state.selectedElementIds = action.payload;
    },
    setElements: (state, action: PayloadAction<ElementsNode[]>) => {
      //update present and past
      const current = state.elements.present;
      const next = action.payload;

      // 🔥 DEEP CLONE (important)
      const currentCopy = JSON.parse(JSON.stringify(current));

      //add the present to the past stack and next to the future stack
      state.elements.past.push(currentCopy);
      state.elements.present = next;
      state.elements.future = [];
    },
    setIsInitialStyleSet: (state, action: PayloadAction<boolean>) => {
      state.isInitialStyleSet = action.payload;
    },
    undo: (state) => {
      //make last past index the present, make present index the future
      const { past, present, future } = state.elements;

      if (past.length === 0) {
        return;
      }

      const previous = past.pop()!;
      const presentCopy = JSON.parse(JSON.stringify(present));
      future.unshift(presentCopy);
      state.elements.present = previous;
    },
    redo: (state) => {
      const { past, present, future } = state.elements;

      if (future.length === 0) {
        return;
      }
      const next = future.shift()!;
      const presentCopy = JSON.parse(JSON.stringify(present));
      past.push(presentCopy);
      state.elements.present = next;
    },
  },
});

export const {
  setImage,
  setSize,
  setStyle,
  setSelectedElementIds,
  setElements,
  undo,
  redo,
  setIsInitialStyleSet,
} = collageSlice.actions;
export default collageSlice.reducer;
