import "./styles.scss";
import { useMediaQuery } from "../hooks/useMediaQuery";
import DesktopMenuLayout from "./layout/desktop-menu-layout";
import MobileMenuLayout from "./layout/mobile-menu-layout";

export default function MenuBar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <>{isMobile ? <MobileMenuLayout /> : <DesktopMenuLayout /> }</>;
}
