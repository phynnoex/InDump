import HeaderBar from "./headerBar";
import "./styles.scss";
import LayersBar from "./layersBar";
import FunctionsBar from "./functionsBar";

export default function MenuBar() {
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
