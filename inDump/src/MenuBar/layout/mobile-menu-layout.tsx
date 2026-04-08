import { useState } from "react";
import FunctionsBar from "../functionsBar";
import LayersBar from "../layersBar";
import "./mobile.scss";

export default function MobileMenuLayout() {
  const [dropdownVisibleID, setDropdownVisibleID] = useState<string | null>(
    null,
  );
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
      <div className="properties-bar"></div>
    </div>
  );
}
