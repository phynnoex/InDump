import {
  ArrowDown01FreeIcons,
  ArrowRight01FreeIcons,
  CardsIcon,
  Upload01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import "./styles.scss";
import type { ElementsNode } from "../../../types/elementType";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../state/store";
import { setElements } from "../../../state/collage/collageSlice";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import MobileMenuPopUp from "../../mobileMenuPopUp";

type AddPostCardProps = {
  dropdownVisibleID: string | null;
  setDropdownVisibleId: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function AddPostCard({
  dropdownVisibleID,
  setDropdownVisibleId,
}: AddPostCardProps) {
  const displayDropdownHandler = () => {
    setDropdownVisibleId("postCard");
  };
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const Elements = useSelector((state: RootState) => state.elements.present);
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleAddPostCard = () => {
    const newPostCardElement: ElementsNode = {
      id: `postCard-${Date.now()}`,
      type: "postCard",
      props: {
        image: selectedImage ?? "",
        scale: 1,
        x: 50,
        y: 50,
        rotation: 0,
      },
    };
    dispatch(setElements([...Elements, newPostCardElement]));
    setDropdownVisibleId(null);
  };

  return (
    <div
      className={`addPostCard ${dropdownVisibleID === "postCard" ? "active" : ""}`}
      onClick={displayDropdownHandler}
    >
      {!isMobile ? (
        <>
          <div className="dropDownWrapper">
            <div className="dropDownContainer">
              <HugeiconsIcon
                icon={
                  dropdownVisibleID === "postCard"
                    ? ArrowDown01FreeIcons
                    : ArrowRight01FreeIcons
                }
                size={16}
                stroke="1.5"
              />
            </div>
            <div className="buttonContent">
              <div className="contentIcon">
                <HugeiconsIcon icon={CardsIcon} size={16} stroke="1.5" />
              </div>
              <div className="contentText">Add Post Card</div>
            </div>
          </div>
          {dropdownVisibleID === "postCard" && (
            <div className="postCardOptions">
              <label className="customFileInput">
                <HugeiconsIcon
                  icon={Upload01FreeIcons}
                  size={24}
                  stroke="1.5"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setSelectedImage(e.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddPostCard();
                }}
                className="closeButton"
              >
                Add
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <HugeiconsIcon icon={CardsIcon} size={24} stroke="1.5" />
          {dropdownVisibleID === "postCard" && (
            <MobileMenuPopUp
              title="Add Post Card"
              setVisibleId={setDropdownVisibleId}
            >
              <label className="customFileInput">
                <HugeiconsIcon
                  icon={Upload01FreeIcons}
                  size={24}
                  stroke="1.5"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setSelectedImage(e.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddPostCard();
                }}
                className="closeButton"
              >
                Add
              </button>
            </MobileMenuPopUp>
          )}
        </>
      )}
    </div>
  );
}
