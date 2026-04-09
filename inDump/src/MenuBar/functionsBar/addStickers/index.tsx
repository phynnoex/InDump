import {
  ArrowDown01FreeIcons,
  ArrowRight01FreeIcons,
  ImageIcon,
} from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";
import "./styles.scss";
import type { ElementsNode } from "../../../types/elementType";
import stickers from "./stickers";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../state/store";
import { setElements } from "../../../state/collage/collageSlice";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import MobileMenuPopUp from "../../mobileMenuPopUp";

type AddStickersProps = {
  dropdownVisibleID: string | null;
  setDropdownVisible: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function AddStickers({
  dropdownVisibleID,
  setDropdownVisible,
}: AddStickersProps) {
  const Elements = useSelector((state: RootState) => state.elements.present);
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const displayDropdownHandler = () => {
    if (dropdownVisibleID === "sticker") {
      setDropdownVisible(null);
    } else {
      setDropdownVisible("stickers");
    }
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
    <div
      className={`addStickers ${dropdownVisibleID === "stickers" ? "active" : ""}`}
      onClick={displayDropdownHandler}
    >
      {!isMobile ? (
        <>
          <div className="dropDownWrapper">
            <div className="dropDownContainer">
              <HugeiconsIcon
                icon={
                  dropdownVisibleID === "stickers"
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
          {dropdownVisibleID === "stickers" && (
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
          {dropdownVisibleID === "stickers" && (
            <MobileMenuPopUp
              title="Add Sticker"
              setVisibleId={setDropdownVisible}
            >
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
