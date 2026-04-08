import type { ElementsNode } from "../../types/elementType";
import "./styles.scss";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Cancel01FreeIcons,
  Copy01Icon,
  Delete01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import PropertiesBar from "./Properties";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../state/store";
import {
  redo,
  setElements,
  setSelectedElementIds,
  undo,
} from "../../state/collage/collageSlice";
import { useShortcut } from "../../hooks/useShortcut";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import LayersMobileBar from "./layersMobile";

type LayersBarProps = {
  dropdownVisibleID: string | null;
  setDropdownVisibleId: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LayersBar({ dropdownVisibleID, setDropdownVisibleId }: LayersBarProps) {
  const selectedIds = useSelector(
    (state: RootState) => state.selectedElementIds,
  );

  const elements = useSelector((state: RootState) => state.elements.present);
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const selectedLayers = selectedIds
    ? elements
        .filter((el) => selectedIds.includes(el.id))
        .map((el) => ({ id: el.id, type: el.type }))
    : [];

  const deleteLayer = (id: string[]) => {
    dispatch(setElements(elements.filter((el) => !id.includes(el.id))));

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

    dispatch(setElements([...elements, ...duplicatedLayers]));
  };

  const MoveLayerForward = (id: string) => {
    if (selectedIds && selectedIds.includes(id)) {
      const index = elements.findIndex((el) => el.id === id);

      if (index < elements.length - 1) {
        const newElements = [...elements];
        const temp = newElements[index];
        newElements[index] = newElements[index + 1];
        newElements[index + 1] = temp;
        dispatch(setElements(newElements));
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
        dispatch(setElements(newElements));
      }
    }
  };

  useShortcut("delete", () => {
    deleteLayer(selectedIds || []);
  });

  useShortcut("ctrl+d", () => {
    duplicateLayer(selectedIds || []);
  });

  useShortcut("ctrl+z", () => {
    dispatch(undo());
  });

  useShortcut("ctrl+y", () => {
    dispatch(redo());
  });

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
      {!isMobile ? (
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
                <HugeiconsIcon
                  icon={Cancel01FreeIcons}
                  size={24}
                  stroke="1.5"
                />
              </button>
              <button
                className="delete-layer-button"
                onClick={() =>
                  deleteLayer(selectedLayers.map((layer) => layer.id))
                }
              >
                <HugeiconsIcon
                  icon={Delete01FreeIcons}
                  size={24}
                  stroke="1.5"
                />
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
                  MoveLayerBackward(
                    selectedLayers[selectedLayers.length - 1].id,
                  )
                }
              >
                <HugeiconsIcon icon={ArrowDownIcon} size={24} stroke="1.5" />
              </button>
            </div>
          </div>
          <PropertiesBar
            selectedLayer={selectedLayers[selectedLayers.length - 1]}
          />
        </>
      ) : (
        <LayersMobileBar
          dropdownVisibleID={dropdownVisibleID}
          setDropdownVisibleId={setDropdownVisibleId}
          elements={elements}
          selectedLayers={selectedLayers}
          deleteLayer={deleteLayer}
          duplicateLayer={duplicateLayer}
          MoveLayerForward={MoveLayerForward}
          MoveLayerBackward={MoveLayerBackward}
          selectedIds={selectedIds}
          handleClickLayer={handleClickLayer}
        />
      )}
    </>
  );
}
