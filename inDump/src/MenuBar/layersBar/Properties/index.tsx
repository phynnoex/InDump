import "./styles.scss";
import type { elementIDType } from "../../../types/ElementIDTypeTypes";
import type { ElementsNode } from "../../../types/elementType";

type selectedLayerType = {
  id: string;
  type: elementIDType;
};

type PropertiesBarProps = {
  selectedLayer: selectedLayerType;
  setElements: React.Dispatch<React.SetStateAction<ElementsNode[]>>;
};

export default function PropertiesBar({
  selectedLayer,
  setElements,
}: PropertiesBarProps) {
  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "text-content" && selectedLayer?.type === "text") {
      setElements((prevElements) =>
        prevElements.map((el) =>
          el.id === selectedLayer.id && el.type === "text"
            ? {
                ...el,
                props: {
                  ...el.props,
                  text: value,
                },
              }
            : el,
        ),
      );
    }

    if (name === "text-size" && selectedLayer?.type === "text") {
      setElements((prevElements) =>
        prevElements.map((el) =>
          el.id === selectedLayer.id && el.type === "text"
            ? {
                ...el,
                props: {
                  ...el.props,
                  size: Number(value),
                },
              }
            : el,
        ),
      );
    }
  };

  if (selectedLayer?.type === "text") {
    return (
      <div className="propertiesBar">
        <h3>Properties</h3>
        <h4>Typography</h4>
        <label htmlFor="text-content" className="w-full">
          Content
          <br />
          <input
            className="w-full"
            type="text"
            id="text-content"
            name="text-content"
            placeholder="Text content"
            onChange={handlePropertyChange}
          />
        </label>
        <label htmlFor="text-size">
          Fontsize
          <br />
          <input
            className="w-half"
            type="number"
            id="text-size"
            name="text-size"
            placeholder="Text size"
            onChange={handlePropertyChange}
          />
        </label>
      </div>
    );
  }
}
