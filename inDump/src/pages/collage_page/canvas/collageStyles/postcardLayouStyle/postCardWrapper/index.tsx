import { Group } from "react-konva";
import PostCard from "../../../../../../components/postCard";
import { useKonvaImage } from "../../../../../../hooks/useKonvaImage";


PostCard

export default function PostCardWrapper({ imageSrc, layout }: { imageSrc: File; layout: any }) {
  const { konvaImage } = useKonvaImage({ image: imageSrc });

  if (!konvaImage) return null;

  return (
    <Group
      x={layout.x}
      y={layout.y}
      rotation={layout.rotation}
      scaleX={layout.scale}
      scaleY={layout.scale}
      draggable
    >
      <PostCard image={konvaImage} scale={1.5} />
    </Group>
  )
}