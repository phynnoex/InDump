import {
  ArrowDown01FreeIcons,
  ArrowRight01FreeIcons,
  ImageIcon,
} from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";
import "./styles.scss";
import type { ElementsNode } from "../../../types/elementType";
import { useState } from "react";
import stickers from "./stickers";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../state/store";
import { setElements } from "../../../state/collage/collageSlice";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import MobileMenuPopUp from "../../mobileMenuPopUp";

export default function AddStickers() {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const Elements = useSelector((state: RootState) => state.elements.present);
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery("(max-width: 768px)");
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

    dispatch(setElements([...Elements, newStickerElement]));
  };

  return (
    <div className="addStickers" onClick={displayDropdownHandler}>
      {!isMobile ? (
        <>
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
        </>
      ) : (
        <>
          <HugeiconsIcon icon={ImageIcon} size={24} stroke="1.5" />
          {dropdownVisible && (
            <MobileMenuPopUp  title="Add Sticker" setVisible={setDropdownVisible}>
              <div className="stickersWrapper">
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
            </MobileMenuPopUp>
          )}
        </>
      )}
    </div>
  );
}
