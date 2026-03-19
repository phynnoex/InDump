import { Image } from "react-konva";
import type { ImageElementProps } from "../../types/elementType";
import { useKonvaImage } from "../../hooks/useKonvaImage";
import useImage from "use-image";

export default function ImageElement({
  imageSrc,
  width,
  height,
}: ImageElementProps) {
  const konvaImage = useKonvaImage({ image: imageSrc });
  if (!konvaImage) return;
  return (
    <Image
      x={0}
      y={0}
      image={konvaImage.konvaImage}
      width={width}
      height={height}
    />
  );
}
