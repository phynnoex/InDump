import "./styles.scss";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store";
import { createGridElements } from "../../collageStyles/Grid";
import { PostCardLayout } from "../../collageStyles/postcardLayout/postCard";
import { setElements } from "../../state/collage/collageSlice";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import MobileLayout from "./layout/mobileLayout";
import DesktopLayout from "./layout/desktopLayout";

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
  const images = useSelector((state: RootState) => state.images);
  const size = useSelector((state: RootState) => state.size);
  const elements = useSelector((state: RootState) => state.elements.present);
  const gridStyle = useSelector((state: RootState) => state.collageStyle);
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery("(max-width: 768px)");

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
      dispatch(setElements(gridElements));
    } else if (gridStyle === "PostCard") {
      const postCardElements = PostCardLayout(
        images[0],
        images,
        size.height,
        size.width,
      );
      dispatch(setElements(postCardElements));
    } else {
      return;
    }
  }, [images, size, gridStyle]);

  return (
    <>
      {/* <MenuBar /> */}
      {isMobile ? (
        <MobileLayout
          sizeOptions={sizeOptions}
          collageOptions={collageOptions}
          elements={elements}
        />
      ) : (
        <DesktopLayout
          sizeOptions={sizeOptions}
          collageOptions={collageOptions}
          elements={elements}
        />
      )}
    </>
  );
}
