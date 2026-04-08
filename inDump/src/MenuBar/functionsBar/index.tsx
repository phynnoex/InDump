import AddTextBox from "./addTextBox";
import "./styles.scss";
import AddPostCard from "./addPostCard";
import AddStickers from "./addStickers";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useState } from "react";

type FunctionsBarProps = {
  dropdownVisibleID: string | null;
  setDropdownVisibleId: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function FunctionsBar({dropdownVisibleID, setDropdownVisibleId}: FunctionsBarProps) {

  
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="functionsBar">
      {!isMobile && <h3>Functions</h3>}
      <AddTextBox />
      <AddPostCard   dropdownVisibleID={dropdownVisibleID} setDropdownVisibleId={setDropdownVisibleId}/>
      <AddStickers dropdownVisibleID={dropdownVisibleID} setDropdownVisible={setDropdownVisibleId} />
    </div>
  );
}