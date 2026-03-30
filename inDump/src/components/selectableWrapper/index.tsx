import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store";
import { useEffect, useRef } from "react";
import { Group, Transformer } from "react-konva";
import type { Konva } from "konva/lib/_FullInternals";
import { setSelectedElementIds } from "../../state/collage/collageSlice";

interface SelectableWrapperProps {
  id: string;
  children: React.ReactNode;
}

export default function SelectableWrapper({
  id,
  children,
}: SelectableWrapperProps) {
  const selectedIds = useSelector((state: RootState) => state.selectedElementIds);
  const isSelected = selectedIds?.includes(id);
  const dispatch = useDispatch<AppDispatch>();

  const trRef = useRef<Konva.Transformer | null>(null);
  const groupRef = useRef<Konva.Group | null>(null);

  useEffect(() => {
    if (isSelected && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [trRef, groupRef, isSelected]);
  return (
    <>
      <Group
        ref={groupRef}
        draggable
        onClick={(e) => {
          e.cancelBubble = true;
          dispatch(setSelectedElementIds([id]));
        }}
        onDragMove={() => {
          trRef.current?.getLayer()?.batchDraw(); // 🔥 keeps transformer in sync
        }}
        onTransform={() => {
          trRef.current?.getLayer()?.batchDraw();
        }}
      >
        {children}
      </Group>
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
}
