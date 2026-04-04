import Canvas from "../canvas";
import React, { useState } from "react";
import UploadImage from "../uploadImage";
import SelectSize from "../uploadImage/selectSize";
import SelectCollageStyle from "../uploadImage/selectCollageStyle";
import RenderElement from "../../../services/RenderElement";

import MenuBar from "../../../MenuBar";
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

export default function DesktopLayout({
  sizeOptions,
  collageOptions,
  elements,
}: {
  sizeOptions: sizeOption[];
  collageOptions: collageOptions[];
  elements: ElementsNode[];
}) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <>
      <div className="collagePage">
        <MenuBar />
        <div className="collagePage_left">
          <Canvas>
            {elements.map((el) => (
              <React.Fragment key={el.id}>{RenderElement(el)}</React.Fragment>
            ))}
          </Canvas>
        </div>
        <div className="collagePage_right">
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
        </div>
      </div>
    </>
  );
}
