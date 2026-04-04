import type React from "react";
import "./styles.scss";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelIcon, ImageIcon } from "@hugeicons/core-free-icons";

type MobilePopUpProps = {
  title: string;
  children: React.ReactNode;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function MobileMenuPopUp({
  title,
  children,
  setVisible,
}: MobilePopUpProps) {

  const handleClose = () => {
    console.log("close");
    setVisible(false);
  }
  return (
    <div className="mobile-menu-pop-up" onClick={(e) => e.stopPropagation()}>
      <div className="mobile-menu-pop-up__header">
        <div className="header-text">{title}</div>
        <div
          className="cancel-button"
          onClick={handleClose}
        >
          <HugeiconsIcon icon={CancelIcon} size={16} stroke="1.5" />
        </div>
      </div>
      <div className="mobile-menu-pop-up__content">{children}</div>
    </div>
  );
}
