import AddTextBox from "./addTextBox";
import "./styles.scss";
import type { ElementsNode } from "../../types/elementType";
import AddPostCard from "./addPostCard";

type FunctionsBarProps = {
    setElements: React.Dispatch<React.SetStateAction<ElementsNode[]>>;
};

export default function FunctionsBar({setElements}: FunctionsBarProps) {
  return (
    <div className="functionsBar">
      <h3>Functions</h3>
      <AddTextBox setElements={setElements} />
      <AddPostCard setElements={setElements} />
    </div>
  );
}