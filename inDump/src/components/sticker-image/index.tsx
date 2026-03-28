import useImage from "use-image";
import { useKonvaImage } from "../../hooks/useKonvaImage";
import type { StickerImageProps } from "../../types/elementType";
import { Image, Transformer } from "react-konva";
import { useEffect, useRef, useState } from "react";
import type { Konva } from "konva/lib/_FullInternals";
import type { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
useKonvaImage;

export default function StickerImage({
  imageSrc,
  opacity,
  stroke,
  strokeWidth,
}: StickerImageProps) {
  const [konvaImage] = useImage(imageSrc);
  const trRef = useRef<Konva.Transformer | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);

  const disptach = useDispatch<AppDispatch>();
  const clicked = useSelector((state: RootState) => state.stageDeselect);

  useEffect(() => {
    useEffect(() => {
      if (clicked && trRef.current && imageRef.current) {
        trRef.current.nodes([imageRef.current]);
      }
    }, [konvaImage, clicked]);
  }, [imageSrc]);

  if (!konvaImage) return;
  return (
    <>
      <Image
      ref={imageRef}
        draggable
        opacity={opacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
        x={0}
        y={0}
        image={konvaImage}
      />
      {clicked && <Transformer ref={trRef} />}
    </>
  );
}
