import Canvas from "../canvas";
import React, { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";
import UploadImage from "../uploadImage";
import SelectSize from "../uploadImage/selectSize";
import SelectCollageStyle from "../uploadImage/selectCollageStyle";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../state/store";
import { useMediaQuery } from "react-responsive";
import UploadModal from "../uploadModal";
import ModalAddButton from "../../../components/modalAddButton";
import RenderElement from "../../../services/RenderElement";
import {
  setElements,
  setIsInitialStyleSet,
} from "../../../state/collage/collageSlice";
import MenuBar from "../../../MenuBar";
import { PostCardLayout } from "../../../collageStyles/postcardLayout/postCard";
import { createGridElements } from "../../../collageStyles/Grid";
import type { ElementsNode } from "../../../types/elementType";

type sizeOption = {
  label: string;
  width: number;
  height: number;
};
type layoutType = "Grid" | "PostCard";
type collageOptions = {
  label: layoutType;
};

export default function MobileLayout({
  sizeOptions,
  collageOptions,
  elements,
}: {
  sizeOptions: sizeOption[];
  collageOptions: collageOptions[];
  elements: ElementsNode[];
}) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const isInitialStyleSet = useSelector(
    (state: RootState) => state.isInitialStyleSet,
  );

  return (
    <>
      <div className="collagePage">
        <div className="collagePage_left">
          <Canvas>
            {elements.map((el) => (
              <React.Fragment key={el.id}>{RenderElement(el)}</React.Fragment>
            ))}
          </Canvas>
          <div className="bottom-menu-container">
            {!isInitialStyleSet && (
              <div className="mobile-menu-bar">
                <MenuBar />
              </div>
            )}
            <div className="add-wrapper">
              <ModalAddButton
                setIsButtonClicked={setIsButtonClicked}
                isButtonClicked={isButtonClicked}
              />
            </div>
          </div>
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
