import { Rect, Text } from "react-konva";
import type { ElementsNode } from "../../types/elementType";
import CustomText from "../../components/addText";
import PostCard from "../../components/postCard";
import GridElement from "../../components/gridElement/gridComponent";

export default function RenderElement(el: ElementsNode) {
  switch (el.type) {
    case "text":
      return <CustomText key={el.id} {...el.props} />;
    case "postCard":
      return <PostCard key={el.id} {...el.props} />;
    case "rectangle":
      return <Rect key={el.id} {...el.props} />;
    case "gridElement":
      return <GridElement key={el.id} {...el.props} />;

    default:
      break;
  }
}
