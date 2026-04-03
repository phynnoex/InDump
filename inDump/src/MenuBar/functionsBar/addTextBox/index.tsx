import { TextIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import "./styles.scss";
import type { ElementsNode } from "../../../types/elementType";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../state/store";
import { setElements } from "../../../state/collage/collageSlice";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useState } from "react";

export default function AddTextBox() {
  const Elements = useSelector((state: RootState) => state.elements.present);

  const dispatch = useDispatch<AppDispatch>();
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
    dispatch(setElements([...Elements, newTextElement]));
  };

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="addTextBox" onClick={addTextHandler}>
      {!isMobile ? (
        <>
          <div className="dropDownContainer"></div>
          <div className="buttonContent">
            <div className="contentIcon">
              <HugeiconsIcon icon={TextIcon} size={16} stroke="1.5" />
            </div>
            <div className="contentText">Add TextBox</div>
          </div>
        </>
      ) : (
        <>
          <HugeiconsIcon icon={TextIcon} size={24} stroke="1.5" />
        </>
      )}
    </div>
  );
}
