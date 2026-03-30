import { useEffect, useState } from "react";
import type { ElementsNode } from "../../types/elementType";
import "./styles.scss";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Cancel01FreeIcons,
  ClosedCaptionIcon,
  Copy01Icon,
  Delete01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import PropertiesBar from "./Properties";
import type { elementIDType } from "../../types/ElementIDTypeTypes";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../state/store";
import { setSelectedElementIds } from "../../state/collage/collageSlice";

type selectedLayerType = {
  id: string;
  type: elementIDType;
};

type LayersBarProps = {
  // Define any props you need for the LayersBar component
  elements: ElementsNode[];
  setElements: React.Dispatch<React.SetStateAction<ElementsNode[]>>;
};

export default function LayersBar({ elements, setElements }: LayersBarProps) {
  const selectedIds = useSelector(
    (state: RootState) => state.selectedElementIds,
  );

  const selectedLayers = selectedIds
    ? elements
        .filter((el) => selectedIds.includes(el.id))
        .map((el) => ({ id: el.id, type: el.type }))
    : [];

  const deleteLayer = (id: string[]) => {
    setElements((prev) => prev.filter((el) => !id.includes(el.id)));
    // If the deleted layer is selected, clear the selection
    if (selectedIds) {
      const newSelectedIds = selectedIds.filter(
        (selectedId) => !id.includes(selectedId),
      );
      dispatch(
        setSelectedElementIds(
          newSelectedIds.length > 0 ? newSelectedIds : null,
        ),
      );
    }
  };

  const duplicateLayer = (id: string[]) => {
    const layersToDuplicate = elements.filter((el) => id.includes(el.id));
    const duplicatedLayers: ElementsNode[] = [];
    layersToDuplicate.forEach((layer) => {
      const newLayer = {
        ...layer,
        id: `${layer.id}-copy-${Date.now()}`,
      };
      duplicatedLayers.push(newLayer);
    });

    setElements((prev) => [...prev, ...duplicatedLayers]);
  };

  const MoveLayerForward = (id: string) => {
    if (selectedIds && selectedIds.includes(id)) {
      const index = elements.findIndex((el) => el.id === id);

      if (index < elements.length - 1) {
        const newElements = [...elements];
        const temp = newElements[index];
        newElements[index] = newElements[index + 1];
        newElements[index + 1] = temp;
        setElements(newElements);
      }
    }
  };

  const MoveLayerBackward = (id: string) => {
    if (selectedIds && selectedIds.includes(id)) {
      const index = elements.findIndex((el) => el.id === id);

      if (index > 0) {
        const newElements = [...elements];
        const temp = newElements[index];
        newElements[index] = newElements[index - 1];
        newElements[index - 1] = temp;
        setElements(newElements);
      }
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleClickLayer = (id: string) => {
    if (selectedIds && selectedIds.includes(id)) {
      // If the layer is already selected, deselect it
      dispatch(setSelectedElementIds(null));
    } else {
      // Otherwise, select the layer
      dispatch(setSelectedElementIds([id]));
    }
  };

  return (
    <>
      <div className="layersBar">
        <h3>Layers</h3>
        <div className="layers-display">
          {elements
            .slice()
            .reverse()
            .map((el) => (
              <div
                key={el.id}
                className={`layer-item ${selectedIds && selectedIds.includes(el.id) ? "selected" : ""}`}
                onClick={() => handleClickLayer(el.id)}
              >
                {el.type} - {el.id}
              </div>
            ))}
        </div>
        <div className="action-buttons">
          <button className="add-layer-button">
            <HugeiconsIcon icon={Cancel01FreeIcons} size={24} stroke="1.5" />
          </button>
          <button
            className="delete-layer-button"
            onClick={() => deleteLayer(selectedLayers.map((layer) => layer.id))}
          >
            <HugeiconsIcon icon={Delete01FreeIcons} size={24} stroke="1.5" />
          </button>
          <button
            className="duplicate-layer-button"
            onClick={() =>
              duplicateLayer(selectedLayers.map((layer) => layer.id))
            }
          >
            <HugeiconsIcon icon={Copy01Icon} size={24} stroke="1.5" />
          </button>

          <button
            className="moveForward-layer-button"
            onClick={() =>
              MoveLayerForward(selectedLayers[selectedLayers.length - 1].id)
            }
          >
            <HugeiconsIcon icon={ArrowUpIcon} size={24} stroke="1.5" />
          </button>
          <button
            className="moveBackward-layer-button"
            onClick={() =>
              MoveLayerBackward(selectedLayers[selectedLayers.length - 1].id)
            }
          >
            <HugeiconsIcon icon={ArrowDownIcon} size={24} stroke="1.5" />
          </button>
        </div>
      </div>
      <PropertiesBar
        Elements={elements}
        selectedLayer={selectedLayers[selectedLayers.length - 1]}
        setElements={setElements}
      />
    </>
  );
}
