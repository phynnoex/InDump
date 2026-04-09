import "./styles.scss";
import { useMediaQuery } from "../hooks/useMediaQuery";
import DesktopMenuLayout from "./layout/desktop-menu-layout";
import MobileMenuLayout from "./layout/mobile-menu-layout";
import { useState } from "react";

export default function MenuBar() {
  const [dropdownVisibleID, setDropdownVisibleID] = useState<string | null>(
    null,
  );
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {isMobile ? (
        <MobileMenuLayout
          dropdownVisibleID={dropdownVisibleID}
          setDropdownVisibleID={setDropdownVisibleID}
        />
      ) : (
        <DesktopMenuLayout
          dropdownVisibleID={dropdownVisibleID}
          setDropdownVisibleId={setDropdownVisibleID}
        />
      )}
    </>
  );
}
