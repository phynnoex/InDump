import { ArrowDown01FreeIcons, TextIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import "./styles.scss";
import type { ElementsNode } from "../../../types/elementType";

type AddTextBoxProps = {
  setElements: React.Dispatch<React.SetStateAction<ElementsNode[]>>;
};

export default function AddTextBox({ setElements }: AddTextBoxProps) {
  const addTextHandler = () => {
    const newTextElement: ElementsNode = {
      id: `text-${Date.now()}`,
      type: "text",
      props: {
        text: "New Text",
        size: 16,
        color: "#000000",
        font: {
          link: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
          fontFamily: "Roboto",
        },
      },
    };
    setElements((prevElements) => [...prevElements, newTextElement]);
  };
  return (
    <div className="addTextBox" onClick={addTextHandler}>
      <div className="dropDownContainer">
        <HugeiconsIcon icon={ArrowDown01FreeIcons} size={16} stroke="1.5" />
      </div>
      <div className="buttonContent">
        <div className="contentIcon">
          <HugeiconsIcon icon={TextIcon} size={16} stroke="1.5" />
        </div>
        <div className="contentText">Add TextBox</div>
      </div>
    </div>
  );
}
