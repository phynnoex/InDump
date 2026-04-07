import { GRIDSHAPES } from "./gridLayoutShapes";
import { type ElementsNode } from "../../types/elementType";

GRIDSHAPES;

export function createGridElements(
  images: string[],
  canvasWidth: number,
  canvasHeight: number,
): ElementsNode[] {
  const shape = GRIDSHAPES[images.length];

  if (!shape) throw new Error(`No layout defined for ${images.length} items`);

  const normalized = shape.map((p) => ({
    x: p.x * canvasWidth,
    y: p.y * canvasHeight,
    h: p.h * canvasHeight,
    w: p.w * canvasWidth,
  }));

  return images.map((image, index) => ({
    id: `grid-${index}`,
    type: "gridElement",
    props: {
      layout: normalized[index],
      imageSrc: image,
    },
  }));
}
