import FunctionsBar from "../functionsBar";

export default function MobileMenuLayout() {
  return (
    <div className="mobile-menu-section">
      <div className="functions-bar">
        <FunctionsBar />
      </div>
      <div className="layers-bar"></div>
      <div className="properties-bar"></div>
    </div>
  );
}
