import FunctionsBar from "../functionsBar";
import LayersBar from "../layersBar";
import "./mobile.scss";

export default function MobileMenuLayout() {
  return (
    <div className="mobile-menu-section">
      <div className="functions-bar">
        <FunctionsBar />
      </div>
      <div className="layers-bar">
        <LayersBar />
      </div>
      <div className="properties-bar"></div>
    </div>
  );
}
