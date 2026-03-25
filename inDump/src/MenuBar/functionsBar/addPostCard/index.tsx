import {
  ArrowDown01FreeIcons,
  ArrowRight01FreeIcons,
  ArrowUp01FreeIcons,
  CardsIcon,
  Upload01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import "./styles.scss";
import type { ElementsNode } from "../../../types/elementType";
import { useState } from "react";

type AddPostCardProps = {
  setElements: React.Dispatch<React.SetStateAction<ElementsNode[]>>;
};

export default function AddPostCard({ setElements }: AddPostCardProps) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const displayDropdownHandler = () => {
    setDropdownVisible((prev) => !prev);
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleAddPostCard = () => {
    const newPostCardElement: ElementsNode = {
      id: `postCard-${Date.now()}`,
      type: "postCard",
      props: {
        image: selectedImage as File,
        scale: 1,
        x: 50,
        y: 50,
        rotation: 0,
      },
    };
    setElements((prevElements) => [...prevElements, newPostCardElement]);
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="addPostCard" onClick={displayDropdownHandler}>
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
            <HugeiconsIcon icon={CardsIcon} size={16} stroke="1.5" />
          </div>
          <div className="contentText">Add Post Card</div>
        </div>
      </div>
      {dropdownVisible && (
        <div className="postCardOptions">
          <label className="customFileInput">
            <HugeiconsIcon icon={Upload01FreeIcons} size={24} stroke="1.5" />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedImage(file);
                  console.log(file);
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
    </div>
  );
}
