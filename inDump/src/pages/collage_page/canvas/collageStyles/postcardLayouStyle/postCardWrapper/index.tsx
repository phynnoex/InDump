import { Group, Transformer } from "react-konva";
import PostCard from "../../../../../../components/postCard";
import { useKonvaImage } from "../../../../../../hooks/useKonvaImage";
import { useLayoutEffect, useRef, useState } from "react";
import type Konva from "konva";

export default function PostCardWrapper({ imageSrc, layout }: { imageSrc: File; layout: any }) {
  const { konvaImage } = useKonvaImage({ image: imageSrc });

  const groupRef = useRef<Konva.Group | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);
  const [clicked, setClicked] = useState(false);

  // Attach Transformer immediately after it is rendered
  useLayoutEffect(() => {
    if (clicked && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [clicked, konvaImage]);

  if (!konvaImage) return null;

  return (
    <>
      <Group
        ref={groupRef}
        x={layout.x}
        y={layout.y}
        rotation={layout.rotation}
        scaleX={layout.scale}
        scaleY={layout.scale}
        draggable
        onDragMove={() => trRef.current?.forceUpdate()}
      >
        <PostCard image={konvaImage} scale={1.5} />
      </Group>
      {clicked && <Transformer ref={trRef} ignoreStroke />}
    </>
  );
}