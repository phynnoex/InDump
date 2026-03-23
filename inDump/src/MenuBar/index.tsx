import HeaderBar from "./headerBar";
import type { ElementsNode } from "../types/elementType";
import "./styles.scss";
import LayersBar from "./layersBar";
import FunctionsBar from "./functionsBar";

type MenuBarProps = {
    elements: ElementsNode[];
    setElements: React.Dispatch<React.SetStateAction<ElementsNode[]>>;
};

export default function MenuBar({elements, setElements}: MenuBarProps) {

    


  return (
    <div className="menu-section">
      <div className="menu-section__header">
        <HeaderBar title="InDump" setIsMenuClose={() => {}} />
      </div>
      <div className="menu-section__functions"><FunctionsBar setElements={setElements}/></div>
      <div className="menu-section__layers"><LayersBar elements={elements} setElements={setElements}/></div>

    </div>
  );
}