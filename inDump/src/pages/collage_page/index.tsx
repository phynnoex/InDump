import "./styles.scss";
import Canvas from "./canvas";
import React, { useEffect, useState } from "react";
import UploadModal from "./uploadModal";
import { AnimatePresence } from "framer-motion";
import UploadImage from "./uploadImage";
import SelectSize from "./uploadImage/selectSize";
import SelectCollageStyle from "./uploadImage/selectCollageStyle";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import ModalAddButton from "../../components/modalAddButton";
import type { ElementsNode } from "../../types/elementType";
import RenderElement from "../../services/RenderElement";
import { createGridElements } from "../../collageStyles/Grid";
import { PostCardLayout } from "../../collageStyles/postcardLayout/postCard";
import MenuBar from "../../MenuBar";

type sizeOption = {
  label: string;
  width: number;
  height: number;
};
type layoutType = "Grid" | "PostCard";
type collageOptions = {
  label: layoutType;
};

export default function CollagePage() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const images = useSelector((state: RootState) => state.images);
  const [elements, setElements] = useState<ElementsNode[]>([
    {
      id: "text-1",
      type: "text",
      props: {
        text: "hey",
        size: 20,
        font: {
          fontFamily: "Carattere",
          link: "https://fonts.googleapis.com/css2?family=Carattere&display=swap",
        },
      },
    },
  ]);
  const gridStyle = useSelector((state: RootState) => state.collageStyle);
  const size = useSelector((state: RootState) => state.size);
  const sizeOptions: sizeOption[] = [
    { label: "1:1", width: 1080, height: 1080 },
    { label: "4:5", width: 1080, height: 1350 },
    { label: "9:16", width: 1080, height: 1920 },
  ];
  const collageOptions: collageOptions[] = [
    { label: "Grid" },
    { label: "PostCard" },
  ];

  useEffect(() => {
    if (!images.length) return;
    if (gridStyle === "Grid") {
      const gridElements = createGridElements(images, size.width, size.height);
      setElements([...gridElements]);
    } else if (gridStyle === "PostCard") {
      const postCardElements = PostCardLayout(
        images[0],
        images,
        size.height,
        size.width,
      );
      setElements([...postCardElements]);
    } else {
      return;
    }
  }, [images, size, gridStyle]);

  return (
    <>
      <MenuBar elements={elements} setElements={setElements}/>
      <div className="collagePage">
        <div className="collagePage_left">
          <Canvas>{elements.map((el) => RenderElement(el))}</Canvas>
          <ModalAddButton
            setIsButtonClicked={setIsButtonClicked}
            isButtonClicked={isButtonClicked}
          />
        </div>
      </div>
      <AnimatePresence>
        {isButtonClicked ? (
          <UploadModal setIsButtonClicked={setIsButtonClicked}>
            <UploadImage />
            <SelectSize sizeOptions={sizeOptions} />
            <SelectCollageStyle
              collageOptions={collageOptions}
            ></SelectCollageStyle>
            <button
              className="collage-submit-button"
              onClick={() => setIsButtonClicked(false)}
            >
              Generate Collage
            </button>
          </UploadModal>
        ) : (
          ""
        )}
      </AnimatePresence>
    </>
  );
}
