import AddTextBox from "./addTextBox";
import "./styles.scss";
import AddPostCard from "./addPostCard";
import AddStickers from "./addStickers";



export default function FunctionsBar() {
  return (
    <div className="functionsBar">
      <h3>Functions</h3>
      <AddTextBox />
      <AddPostCard />
      <AddStickers />
    </div>
  );
}