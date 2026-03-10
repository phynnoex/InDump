import { useRef, useLayoutEffect, useState, Children, type ReactNode } from "react";
import ButtonExport from "./button-export";
import "./styles.scss";

import Artboard from "./artboard";
import { Group, Layer, Rect, Text } from "react-konva";
import type Konva from "konva";

import { useSelector } from "react-redux";
import type { RootState } from "../../../state/store";

interface CanvasProps {
  children: ReactNode
}

export default function Canvas({ children }: CanvasProps) {
  const size = useSelector((state: RootState) => state.size)

  const containerRef = useRef<HTMLDivElement | null>(null);
  const ArtboardRef = useRef<{ getStage: () => Konva.Stage | null }>(null)
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        w: containerRef.current.clientWidth,
        h: containerRef.current.clientHeight,
      });
    }
  }, [containerRef.current]);

  const scaleX = containerSize.w / size.width;
  const scaleY = containerSize.h / size.height;
  const scale = Math.min(scaleX, scaleY);

  const offsetX = (containerSize.w - size.width * scale) / 2;
  const offsetY = (containerSize.h - size.height * scale) / 2;

  return (
    <div className="canvas" ref={containerRef}>
      <ButtonExport ArtboardRef={ArtboardRef} />
      <div className="canvas_background">
        <div className="canvas-element">
          {size.width && size.height ? (
            <Artboard ref={ArtboardRef} width={containerSize.w} height={containerSize.h}>
              <Layer>
                <Group
                  scaleX={scale}
                  scaleY={scale}
                  x={offsetX}
                  y={offsetY}
                >
                  {/* Background rect (your artboard) */}
                  <Rect
                    width={size.width}
                    height={size.height}
                    fill="white"
                    shadowBlur={1}
                  />
                  {children}
                  
                </Group>
              </Layer>
            </Artboard>
          ) : null}
        </div>
      </div>
    </div>
  );
}
