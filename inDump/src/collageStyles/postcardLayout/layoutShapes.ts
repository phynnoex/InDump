import type { LayoutShape } from "../types";

const SHAPES: Record<number, LayoutShape> = {
  1: [
    { x: 0.5, y: 0.5 }
  ],

  2: [
    { x: 0, y: 0 },
    { x: 0.5, y: 0.5 }
  ],

  3: [
    { x: 0.5, y: 0.35 },
    { x: 0.3, y: 0.65 },
    { x: 0.7, y: 0.65 },
  ],

  4: [
    { x: 0.3, y: 0.3 },
    { x: 0.7, y: 0.3 },
    { x: 0.3, y: 0.7 },
    { x: 0.7, y: 0.7 },
  ],

  5: [
    { x: 0.0, y: 0.0 },
    { x: 0.25, y: 0.5 },
    { x: 0.75, y: 0.5 },
    { x: 0.35, y: 0.8 },
    { x: 1.0, y: 1.0 },
  ],

  // you can define 6–12+ shapes the same way
};

export {SHAPES}