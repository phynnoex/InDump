import { Image, Rect, Group, Transformer } from "react-konva";
import { useKonvaImage } from "../../hooks/useKonvaImage";
import type { PostCardProps } from "../../types/elementType";

export default function PostCard({
  image,
  scale,
  x,
  y,
  rotation,
  opacity,
}: PostCardProps) {
  const postCardWidth = 200;
  const postCardHeight = 220;
  const postcardPadding = 12;

  const childWidth = postCardWidth - postcardPadding * 2;
  const childHeight = postCardHeight - postcardPadding * 2;

  const childX = postcardPadding;
  const childY = postcardPadding;


  const { konvaImage } = useKonvaImage({ image: image });

  if (!konvaImage) return null;

  // ----- object-fit: cover -----
  const imgW = konvaImage.width;
  const imgH = konvaImage.height;

  const fitScale = Math.max(childWidth / imgW, childHeight / imgH);
  const fitWidth = imgW * fitScale;
  const fitHeight = imgH * fitScale;
  const offsetX = (childWidth - fitWidth) / 2;
  const offsetY = (childHeight - fitHeight) / 2;
  // ------------------------------
  return (
      <Group
        width={postCardWidth}
        height={postCardHeight}
        shadowColor="black"
        x={x}
        y={y}
        rotation={rotation}
        shadowBlur={10}
        shadowOffset={{ x: 5, y: 5 }}
        shadowOpacity={0.4}
        scale={{ x: scale, y: scale }}
        opacity={opacity}
      >
        <Rect
          x={0}
          y={0}
          width={postCardWidth}
          height={postCardHeight}
          fill="white"
          cornerRadius={2}
        />
        <Group
          name="clipping-mask"
          x={childX}
          y={childY}
          width={childWidth}
          height={childHeight - 25}
          clipWidth={childWidth}
          clipHeight={childHeight - 25}
        >
          <Image
            x={offsetX}
            y={offsetY}
            image={konvaImage}
            width={fitWidth}
            height={fitHeight}
          />
        </Group>
      </Group>
  );
}
