import { use, useState } from "react";
import FunctionsBar from "../functionsBar";
import LayersBar from "../layersBar";
import "./mobile.scss";
import { HugeiconsIcon } from "@hugeicons/react";
import { Setting06Icon } from "@hugeicons/core-free-icons";
import MobileMenuPopUp from "../mobileMenuPopUp";
import PropertiesBar from "../layersBar/Properties";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";

export default function MobileMenuLayout() {
  const [dropdownVisibleID, setDropdownVisibleID] = useState<string | null>(
    null,
  );

  const elements = useSelector((state: RootState) => state.elements.present);
  const selectedIds = useSelector(
    (state: RootState) => state.selectedElementIds,
  );

  const selectedLayers = selectedIds
    ? elements
        .filter((el) => selectedIds.includes(el.id))
        .map((el) => ({ id: el.id, type: el.type }))
    : [];

  const showPropertiesHandler = () => {
    if (dropdownVisibleID === "properties") {
      setDropdownVisibleID(null);
    } else {
      setDropdownVisibleID("properties");
    }
  };
  return (
    <div className="mobile-menu-section">
      <div className="functions-bar">
        <FunctionsBar
          dropdownVisibleID={dropdownVisibleID}
          setDropdownVisibleId={setDropdownVisibleID}
        />
      </div>
      <div className="layers-bar">
        <LayersBar
          dropdownVisibleID={dropdownVisibleID}
          setDropdownVisibleId={setDropdownVisibleID}
        />
      </div>
      <div className="properties-bar">
        <>
          <div className="properties-button" onClick={showPropertiesHandler}>
            <HugeiconsIcon icon={Setting06Icon} size={24} stroke="1.5" />
          </div>
          {dropdownVisibleID === "properties" ? (
            <MobileMenuPopUp
              title="properties"
              setVisibleId={setDropdownVisibleID}
            >
              <PropertiesBar
                selectedLayer={selectedLayers[selectedLayers.length - 1]}
              />
            </MobileMenuPopUp>
          ) : null}
        </>
      </div>
    </div>
  );
}
