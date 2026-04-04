import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store";
import { useEffect, useRef } from "react";
import { Group, Transformer } from "react-konva";
import type { Konva } from "konva/lib/_FullInternals";
import type { ElementsNode } from "../../types/elementType";
import {
  setElements,
  setSelectedElementIds,
} from "../../state/collage/collageSlice";

interface SelectableWrapperProps {
  id: string;
  children: React.ReactNode;
}

export default function SelectableWrapper({
  id,
  children,
}: SelectableWrapperProps) {
  const selectedIds = useSelector(
    (state: RootState) => state.selectedElementIds,
  );
  const isSelected = selectedIds?.includes(id);
  const dispatch = useDispatch<AppDispatch>();
  const elements = useSelector((state: RootState) => state.elements.present);

  const trRef = useRef<Konva.Transformer | null>(null);
  const groupRef = useRef<Konva.Group | null>(null);

  useEffect(() => {
    if (isSelected && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [trRef, groupRef, isSelected]);

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, id: string) => {
    console.log("drag end", e);
    const newElements: ElementsNode[] = elements.map((el) =>
      el.id === id
        ? {
            ...el,
            props: {
              ...el.props,
              position: { x: e.target.x(), y: e.target.y() },
            },
          }as ElementsNode
        : el,
    );
    dispatch(setElements(newElements));
  };
  return (
    <>
      <Group
        ref={groupRef}
        draggable
        onTap={(e) => {
          e.cancelBubble = true;
          dispatch(setSelectedElementIds([id]));
        }}
        onClick={(e) => {
          e.cancelBubble = true;
          dispatch(setSelectedElementIds([id]));
        }}
        onDragEnd={(e) => handleDragEnd(e, id)}
      >
        {children}
      </Group>
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
}
