import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ElementsNode } from "../../types/elementType";

type CollageStyle = "Grid" | "PostCard";

interface CollageState {
  images: File[];
  size: { width: number; height: number };
  collageStyle: CollageStyle;
  selectedElementIds: string[] | null;
  elements: {
    past: ElementsNode[][];
    present: ElementsNode[];
    future: ElementsNode[][];
  };
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
};

// createSlice
const collageSlice = createSlice({
  initialState,
  name: "collage",
  reducers: {
    setImage: (state, action: PayloadAction<File>) => {
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

      //add the present to the past stack and next to the future stack
      state.elements.past.push(current);
      state.elements.present = next;
      state.elements.future = [];
    },
    undo: (state) => {
      //make last past index the present, make present index the future
      const { past, present, future } = state.elements;

      if (past.length === 0) {
        return;
      }

      const previous = past.pop()!;
      future.unshift(present);
      state.elements.present = previous;
    },
    redo: (state) => {
      const { past, present, future } = state.elements;

      if (future.length === 0) {
        return;
      }
      const next = future.shift()!;
      past.push(present);
      state.elements.present = next;
    },
  },
});

export const { setImage, setSize, setStyle, setSelectedElementIds, setElements, undo, redo } =
  collageSlice.actions;
export default collageSlice.reducer;
