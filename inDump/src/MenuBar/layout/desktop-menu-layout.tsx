import FunctionsBar from "../functionsBar";
import HeaderBar from "../headerBar";
import LayersBar from "../layersBar";
import "./dekstop.scss";

type DesktopMenuLayoutProps = {
  dropdownVisibleID: string | null;
  setDropdownVisibleId: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function DesktopMenuLayout({
  dropdownVisibleID,
  setDropdownVisibleId,
}: DesktopMenuLayoutProps) {
  return (
    <div className="menu-section">
      <div className="menu-section__header">
        <HeaderBar title="InDump" setIsMenuClose={() => {}} />
      </div>
      <div className="menu-section__functions">
        <FunctionsBar
          dropdownVisibleID={dropdownVisibleID}
          setDropdownVisibleId={setDropdownVisibleId}
        />
      </div>
      <div className="menu-section__layers">
        <LayersBar
          dropdownVisibleID={dropdownVisibleID}
          setDropdownVisibleId={setDropdownVisibleId}
        />
      </div>
    </div>
  );
}
