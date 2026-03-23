import "./styles.scss";
import type { TextElementProps } from "../../../types/elementType";
import type { elementIDType } from "../../../types/ElementIDTypeTypes";

type PropertiesBarProps = {
  selectedLayer: elementIDType;
};

const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Handle the change event for the property input
  console.log("Property changed:", e.target);


}

export default function PropertiesBar({ selectedLayer }: PropertiesBarProps) {
  if (selectedLayer === "text") {
    return (
        
      <div className="propertiesBar" >
        <label htmlFor="text-content">
          <input type="text" id="text-content" name="text-content" placeholder="Text content" onChange={handlePropertyChange} />
        </label>
        <label htmlFor="text-size">
          <input type="number" id="text-size" name="text-size" placeholder="Text size" onChange={handlePropertyChange} />
        </label>
      </div>
    );
  }
}
