import { Image } from "react-konva";
import type { ImageElementProps } from "../../types/elementType";
import { useKonvaImage } from "../../hooks/useKonvaImage";
import useImage from "use-image";

export default function ImageElement({
  imageSrc,
  width,
  height,
  opacity

}: ImageElementProps) {
  const [konvaImage] = useImage(imageSrc);
  return (
    <Image
      opacity={opacity}
      x={0}
      y={0}
      image={konvaImage}
      width={width}
      height={height}
    />
  );
}
