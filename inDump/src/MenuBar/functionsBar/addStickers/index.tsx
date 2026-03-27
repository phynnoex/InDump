import {
  ArrowDown01FreeIcons,
  ArrowRight01FreeIcons,
  CardsIcon,
  ImageIcon,
  Upload01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import "./styles.scss";
import type { ElementsNode } from "../../../types/elementType";
import { useState } from "react";
import stickers from "./stickers";

type AddStickersProps = {
  setElements: React.Dispatch<React.SetStateAction<ElementsNode[]>>;
};

export default function AddStickers({ setElements }: AddStickersProps) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const displayDropdownHandler = () => {
    setDropdownVisible((prev) => !prev);
  };

  

  const handleAddSticker = (image: string) => {
    const newStickerElement: ElementsNode = {
      id: `sticker-${Date.now()}`,
      type: "stickerImage",
      props: {
        imageSrc: image || "",
        opacity: 1,
        stroke: "#000000",
        strokeWidth: 0,
      },
    };

    setElements((prevElements) => [...prevElements, newStickerElement]);
  };

  return (
    <div className="addStickers" onClick={displayDropdownHandler}>
      <div className="dropDownWrapper">
        <div className="dropDownContainer">
          <HugeiconsIcon
            icon={
              dropdownVisible === true
                ? ArrowDown01FreeIcons
                : ArrowRight01FreeIcons
            }
            size={16}
            stroke="1.5"
          />
        </div>
        <div className="buttonContent">
          <div className="contentIcon">
            <HugeiconsIcon icon={ImageIcon} size={16} stroke="1.5" />
          </div>
          <div className="contentText">Add Sticker</div>
        </div>
      </div>
      {dropdownVisible && (
        <div className="stickersOptions">
          {stickers.map((sticker, index) => (
            <div
              key={index}
              className="stickerOption"
              onClick={() => handleAddSticker(sticker)}
            >
              <img
                src={sticker}
                alt={`sticker-${index}`}
                className="stickerPreview"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
