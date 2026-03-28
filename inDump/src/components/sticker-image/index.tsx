import useImage from "use-image";
import { useKonvaImage } from "../../hooks/useKonvaImage";
import type { StickerImageProps } from "../../types/elementType";
import { Image} from "react-konva";
useKonvaImage;

export default function StickerImage({
  imageSrc,
  opacity,
  stroke,
  strokeWidth,
}: StickerImageProps) {
  const [konvaImage] = useImage(imageSrc);

  if (!konvaImage) return;
  return (
    <Image
      opacity={opacity}
      stroke={stroke}
      strokeWidth={strokeWidth}
      x={0}
      y={0}
      image={konvaImage}
    />
  );
}
