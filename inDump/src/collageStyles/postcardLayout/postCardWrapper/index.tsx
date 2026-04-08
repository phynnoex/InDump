import { Group } from "react-konva";

export default function PostCardWrapper({
  layout,
}: {
  imageSrc: string;
  layout: any;
}) {
  return (
    <>
      <Group
        x={layout.x}
        y={layout.y}
        rotation={layout.rotation}
        scaleX={layout.scale}
        scaleY={layout.scale}
      ></Group>
    </>
  );
}
