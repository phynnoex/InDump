import { useState } from "react";
import type { ElementsNode } from "../../types/elementType";
import "./styles.scss";
import {
  Cancel01FreeIcons,
  ClosedCaptionIcon,
  Delete01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import PropertiesBar from "./Properties";
import type { elementIDType } from "../../types/ElementIDTypeTypes";

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

  const handleClickLayer = (id: string) => {
    console.log(selectedLayers);
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

  return (
    <>
      <div className="layersBar">
        <h3>Layers</h3>
        <div className="layers-display">
          {elements.map((el) => (
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
        </div>
      </div>
      <PropertiesBar
        selectedLayer={selectedLayers[selectedLayers.length - 1]?.type || ""}
      />
    </>
  );
}
