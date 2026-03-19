import addOrganicVariation from "../../services/addOrganicVariations";
import computeLayout from "../../services/normalizeLayoutShapes/computeLyout";
import type { ElementsNode } from "../../types/elementType";

type RawPointsType = {
  x: number;
  y: number;
  rotation: number | 0;
  scale: number | 0;
};

export function PostCardLayout(
  bgImage: File,
  images: File[],
  canvasHeight: number,
  canvasWidth: number,
): ElementsNode[] {
  const bgImageElement: ElementsNode = {
    id: "bgImage1",
    type: "image",
    props: {
      imageSrc: bgImage,
      height: canvasHeight,
      width: canvasWidth,
    },
  };

  const rawpoints: RawPointsType[] = computeLayout(
    images.length,
    canvasWidth,
    canvasHeight,
  ).map((p) => {
    return addOrganicVariation(p);
  });

  const postCards: ElementsNode[] = images.map((image, index) => {
    return {
      id: `postCard${index}`,
      type: "postCard",
      props: {
        image: image,
        scale: 1,
        x: rawpoints[index].x,
        y: rawpoints[index].y,
        rotation: rawpoints[index].rotation,
      },
    };
  });

  return [bgImageElement, ...postCards];
}
