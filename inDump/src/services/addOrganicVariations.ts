import type { Point } from "../pages/collage_page/canvas/collageStyles/types";

export default function addOrganicVariation(point: Point) {
  return {
    x: point.x + (Math.random() * 20 - 10), // ±10px
    y: point.y + (Math.random() * 20 - 10),
    rotation: Math.random() * 15 - 7.5, // -7° to 7°
    scale: 0.9 + Math.random() * 0.2   // 0.9–1.1
  };
}
