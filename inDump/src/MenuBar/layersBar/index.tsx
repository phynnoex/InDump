import { useEffect, useState } from "react";
import type { ElementsNode } from "../../types/elementType";
import "./styles.scss";
import {
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
import { setSelectedElementId } from "../../state/collage/collageSlice";

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
  const [selectedLayers, setSelectedLayers] = useState<selectedLayerType[]>([]);
  const deleteLayer = (id: string[]) => {
    setElements((prevElements) =>
      prevElements.filter((el) => !id.includes(el.id)),
    );
    setSelectedLayers((prevSelected) =>
      prevSelected.filter((layer) => !id.includes(layer.id)),
    );
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
    setElements((prevElements) => {
      const index = prevElements.findIndex((el) => el.id === id);
      if (index < prevElements.length - 1) {
        const newElements = [...prevElements];
        [newElements[index], newElements[index + 1]] = [
          newElements[index + 1],
          newElements[index],
        ];
        return newElements;
      }

      return prevElements;
    });
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleClickLayer = (id: string) => {
    console.log(selectedLayers);
    dispatch(setSelectedElementId(id));
    const isSelected = selectedLayers.some((layer) => layer.id === id);
    if (isSelected) {
      setSelectedLayers((prev) => prev.filter((layer) => layer.id !== id));
    } else {
      const layerToAdd = elements.find((el) => el.id === id);
      if (layerToAdd) {
        setSelectedLayers((prev) => [
          ...prev,
          { id: layerToAdd.id, type: layerToAdd.type },
        ]);
      }
    }
  };

  const selectedId = useSelector((state: RootState) => state.selectedElementId);

  useEffect(() => {
    if (selectedId) {
      const layerToAdd = elements.find((el) => el.id === selectedId);
      if (layerToAdd) {
        setSelectedLayers([{ id: layerToAdd.id, type: layerToAdd.type }]);
      }
    } else {
      setSelectedLayers([]);
    }
  }, [selectedId,  elements]);

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
                className={`layer-item ${selectedLayers.some((layer) => layer.id === el.id) ? "selected" : ""}`}
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
            onClick={() => MoveLayerForward(selectedLayers[0]?.id)}
          >
            <HugeiconsIcon icon={ArrowUpIcon} size={24} stroke="1.5" />
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
