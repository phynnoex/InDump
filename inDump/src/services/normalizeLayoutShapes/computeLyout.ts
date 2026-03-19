import {SHAPES} from "../../collageStyles/postcardLayout/layoutShapes"

export default function computeLayout(count: number, canvasWidth: number, canvasHeight: number) {
  const shape = SHAPES[count];
  console.log(canvasWidth, canvasHeight)

  if (!shape) throw new Error(`No layout defined for ${count} items`);

  return shape.map(p => ({
    x: p.x * canvasWidth,
    y: p.y * canvasHeight,
  }));
}