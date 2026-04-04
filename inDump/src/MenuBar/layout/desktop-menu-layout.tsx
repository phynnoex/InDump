import FunctionsBar from "../functionsBar";
import HeaderBar from "../headerBar";
import LayersBar from "../layersBar";
import "./dekstop.scss"

export default function DesktopMenuLayout() {
  return (
    <div className="menu-section">
      <div className="menu-section__header">
        <HeaderBar title="InDump" setIsMenuClose={() => {}} />
      </div>
      <div className="menu-section__functions">
        <FunctionsBar />
      </div>
      <div className="menu-section__layers">
        <LayersBar />
      </div>
    </div>
  );
}
