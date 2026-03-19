import { Image, Rect, Group, Transformer } from "react-konva";
import { useKonvaImage } from "../../hooks/useKonvaImage";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store";
import Konva from "konva";
import { setStageDeselect } from "../../state/collage/collageSlice";

type postCardProps = {
  image: File;
  scale: number | 0;
  x: number | 0;
  y: number | 0;
  rotation: number | 0;
};

export default function PostCard({
  image,
  scale,
  x,
  y,
  rotation,
}: postCardProps) {
  const postCardWidth = 200;
  const postCardHeight = 220;
  const postcardPadding = 12;

  const childWidth = postCardWidth - postcardPadding * 2;
  const childHeight = postCardHeight - postcardPadding * 2;

  const childX = postcardPadding;
  const childY = postcardPadding;

  const groupRef = useRef<Konva.Group | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);
  const clicked = useSelector((state: RootState) => state.stageDeselect);
  const disptach = useDispatch<AppDispatch>();

  const { konvaImage } = useKonvaImage({ image: image });

  useEffect(() => {
    if (clicked && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current]);
    }
  }, [konvaImage, clicked]);

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
    <>
      <Group
        ref={groupRef}
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
        draggable
        onDragEnd={() => {
          disptach(setStageDeselect(true));
        }}
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
      {clicked && <Transformer ref={trRef} />}
    </>
  );
}
