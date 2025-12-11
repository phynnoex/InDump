import {SHAPES} from "../../pages/collage_page/canvas/collageStyles/postcardLayouStyle/layoutShapes"

export default function computeLayout(count: number, canvasWidth: number, canvasHeight: number) {
  const shape = SHAPES[count];

  if (!shape) throw new Error(`No layout defined for ${count} items`);

  return shape.map(p => ({
    x: p.x * canvasWidth,
    y: p.y * canvasHeight,
  }));
}