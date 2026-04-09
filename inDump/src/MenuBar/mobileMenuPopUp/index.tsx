import type React from "react";
import "./styles.scss";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelIcon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";

type MobilePopUpProps = {
  title: string;
  children: React.ReactNode;
  setVisibleId: React.Dispatch<React.SetStateAction<string | null>>;
};
export default function MobileMenuPopUp({
  title,
  children,
  setVisibleId,
}: MobilePopUpProps) {
  const handleClose = () => {
    console.log("close");
    setVisibleId(null);
  };
  return (
    <motion.div
      className="mobile-menu-pop-up"
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mobile-menu-pop-up__header">
        <div className="header-text">{title}</div>
        <div className="cancel-button" onClick={handleClose}>
          <HugeiconsIcon icon={CancelIcon} size={16} stroke="1.5" />
        </div>
      </div>
      <div className="mobile-menu-pop-up__content">{children}</div>
    </motion.div>
  );
}
