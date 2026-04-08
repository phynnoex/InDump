import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowTurnBackwardIcon,
  ArrowTurnForwardIcon,
  LayersIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import MobileMenuPopUp from "../mobileMenuPopUp";
import "./styles.scss";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Cancel01FreeIcons,
  Copy01Icon,
  Delete01FreeIcons,
} from "@hugeicons/core-free-icons";
import type { AppDispatch } from "../../state/store";
import { useDispatch } from "react-redux";
import { redo, undo } from "../../state/collage/collageSlice";

type LayersMobileBarProps = {
  elements: any[];
  selectedIds: string[] | null;
  handleClickLayer: (id: string) => void;
  selectedLayers: { id: string; type: string }[];
  deleteLayer: (id: string[]) => void;
  duplicateLayer: (id: string[]) => void;
  MoveLayerForward: (id: string) => void;
  MoveLayerBackward: (id: string) => void;
};

export default function LayersMobileBar({
  elements,
  selectedIds,
  handleClickLayer,
  selectedLayers,
  deleteLayer,
  duplicateLayer,
  MoveLayerForward,
  MoveLayerBackward,
}: LayersMobileBarProps) {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const displayDropDownHandler = () => {
    setDropDownVisible((prev) => !prev);
  };
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="layers-bar-mobile" onClick={displayDropDownHandler}>
        <HugeiconsIcon icon={LayersIcon} size={24} stroke="1.5" />
      </div>
      {dropDownVisible && (
        <MobileMenuPopUp title="Layers" setVisible={setDropDownVisible}>
          <div className="mobile-layers-wrapper">
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
            <div className="mobile-action-buttons">
              <button className="mobile-action-button">
                <HugeiconsIcon
                  icon={Cancel01FreeIcons}
                  size={24}
                  stroke="1.5"
                />
              </button>
              <button
                className="mobile-action-button"
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
                className="mobile-action-button"
                onClick={() =>
                  duplicateLayer(selectedLayers.map((layer) => layer.id))
                }
              >
                <HugeiconsIcon icon={Copy01Icon} size={24} stroke="1.5" />
              </button>

              <button
                className="mobile-action-button"
                onClick={() =>
                  MoveLayerForward(selectedLayers[selectedLayers.length - 1].id)
                }
              >
                <HugeiconsIcon icon={ArrowUpIcon} size={24} stroke="1.5" />
              </button>
              <button
                className="mobile-action-button"
                onClick={() =>
                  MoveLayerBackward(
                    selectedLayers[selectedLayers.length - 1].id,
                  )
                }
              >
                <HugeiconsIcon icon={ArrowDownIcon} size={24} stroke="1.5" />
              </button>
              <button
                className="mobile-action-button"
                onClick={() => dispatch(undo())}
              >
                <HugeiconsIcon
                  icon={ArrowTurnBackwardIcon}
                  size={24}
                  stroke="1.5"
                />
              </button>
              <button
                className="mobile-action-button"
                onClick={() => dispatch(redo())}
              >
                <HugeiconsIcon
                  icon={ArrowTurnForwardIcon}
                  size={24}
                  stroke="1.5"
                />
              </button>
            </div>
          </div>
        </MobileMenuPopUp>
      )}
    </>
  );
}
