import { Group, Transformer } from "react-konva";
import PostCard from "../../../../../../components/postCard";
import { useKonvaImage } from "../../../../../../hooks/useKonvaImage";
import { useEffect, useRef, useState } from "react";

import type Konva from "konva";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../../../../state/store";
import { setStageDeselect } from "../../../../../../state/collage/collageSlice";


export default function PostCardWrapper({ imageSrc, layout }: { imageSrc: File; layout: any }) {
  const { konvaImage } = useKonvaImage({ image: imageSrc });

  

  const groupRef = useRef<Konva.Group | null>(null)
  const trRef = useRef<Konva.Transformer | null>(null)
  const clicked = useSelector((state:RootState) => state.stageDeselect)
  const disptach = useDispatch<AppDispatch>()

  useEffect(() => {
    if (clicked && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current])
    }
  }, [konvaImage, clicked])

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
        onDragStart={()=>{console.log("hey")}}
        onDragEnd={()=>{disptach(setStageDeselect(true))}}
      >
        
        <PostCard image={konvaImage} scale={1.5} />

      </Group>
      {clicked && <Transformer ref={trRef}  />}
    </>
  )
}