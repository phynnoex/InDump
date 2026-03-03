import { Group, Circle, Rect, Ellipse, Line } from "react-konva";

type DinoProps = {
  x?: number;
  y?: number;
  scale?: number;
};

export default function CuteDino({ x = 0, y = 0, scale = 1 }: DinoProps) {
  return (
    <Group x={x} y={y} scaleX={scale} scaleY={scale} draggable={true}>
      
      {/* Body */}
      <Ellipse
        x={50}
        y={90}
        radiusX={25}
        radiusY={30}
        fill="#6FCF97"
      />

      {/* Head */}
      <Circle
        x={50}
        y={40}
        radius={30}
        fill="#6FCF97"
      />

      {/* Belly */}
      <Ellipse
        x={50}
        y={100}
        radiusX={12}
        radiusY={18}
        fill="#A7EFC1"
      />

      {/* Eye */}
      <Circle x={42} y={35} radius={4} fill="#333" />
      <Circle x={43} y={34} radius={1.5} fill="#fff" />

      {/* Smile */}
      <Line
        points={[45, 45, 55, 45]}
        stroke="#333"
        strokeWidth={2}
        lineCap="round"
      />

      {/* Arm */}
      <Line
        points={[30, 85, 20, 90]}
        stroke="#6FCF97"
        strokeWidth={6}
        lineCap="round"
      />

      {/* Tail */}
      <Line
        points={[75, 95, 100, 105, 115, 100]}
        stroke="#6FCF97"
        strokeWidth={10}
        lineCap="round"
        lineJoin="round"
      />

      {/* Spikes */}
      <Line
        points={[
          50, 10,
          60, 20,
          50, 25,
          40, 20
        ]}
        closed
        fill="#56B37F"
      />

    </Group>
  );
}
