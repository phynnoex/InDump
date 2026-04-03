import AddTextBox from "./addTextBox";
import "./styles.scss";
import AddPostCard from "./addPostCard";
import AddStickers from "./addStickers";
import { useMediaQuery } from "../../hooks/useMediaQuery";



export default function FunctionsBar() {

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="functionsBar">
      {!isMobile && <h3>Functions</h3>}
      <AddTextBox />
      <AddPostCard />
      <AddStickers />
    </div>
  );
}