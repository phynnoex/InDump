import { Rect } from "react-konva";
import type { ElementsNode } from "../../types/elementType";
import CustomText from "../../components/addText";
import PostCard from "../../components/postCard";
import GridElement from "../../components/gridElement/gridComponent";
import ImageElement from "../../components/ImageElement";
import StickerImage from "../../components/sticker-image";
import SelectableWrapper from "../../components/selectableWrapper";

export default function RenderElement(el: ElementsNode) {
  switch (el.type) {
    case "text":
      return (
        <SelectableWrapper id={el.id}>
          <CustomText {...el.props} />
        </SelectableWrapper>
      );
    case "postCard":
      return (
        <SelectableWrapper id={el.id}>
          <PostCard {...el.props} />
        </SelectableWrapper>
      );
    case "image":
      return (
        <SelectableWrapper id={el.id}>
          <ImageElement {...el.props} />
        </SelectableWrapper>
      );
    case "gridElement":
      return (
        <SelectableWrapper id={el.id}>
          <GridElement {...el.props} />
        </SelectableWrapper>
      );
    case "stickerImage":
      return (
        <SelectableWrapper id={el.id}>
          <StickerImage {...el.props} />
        </SelectableWrapper>
      );
    default:
      break;
  }
}
