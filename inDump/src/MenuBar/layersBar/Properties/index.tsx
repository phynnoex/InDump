import "./styles.scss";
import type { elementIDType } from "../../../types/ElementIDTypeTypes";
import type { ElementsNode } from "../../../types/elementType";
import fonts from "../../../assets/fonts/fontLists";

type selectedLayerType = {
  id: string;
  type: elementIDType;
};

type PropertiesBarProps = {
  selectedLayer: selectedLayerType;
  setElements: React.Dispatch<React.SetStateAction<ElementsNode[]>>;
  Elements: ElementsNode[];
};

export default function PropertiesBar({
  selectedLayer,
  setElements,
  Elements,
}: PropertiesBarProps) {
  const handlePropertyChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
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

    if (name === "font-family" && selectedLayer?.type === "text") {
      const selectedFont = fonts.find((font) => font.fontFamily === value);
      if (selectedFont) {
        setElements((prevElements) =>
          prevElements.map((el) =>
            el.id === selectedLayer.id && el.type === "text"
              ? {
                  ...el,
                  props: {
                    ...el.props,
                    font: selectedFont,
                  },
                }
              : el,
          ),
        );
      }
    }

    if (name === "text-color" && selectedLayer?.type === "text") {
      setElements((prevElements) =>
        prevElements.map((el) =>
          el.id === selectedLayer.id && el.type === "text"
            ? {
                ...el,
                props: {
                  ...el.props,
                  color: value,
                },
              }
            : el,
        ),
      );
    }
  };

  if (selectedLayer?.type === "text") {
    const selectedElement = Elements.find(
      (el) => el.id === selectedLayer.id && el.type === "text",
    );

    if (!selectedElement || selectedElement.type !== "text") {
      return null; // or fallback
    }
    return (
      <div className="propertiesBar">
        <h3>Properties</h3>
        <h4>Typography</h4>
        <div className="inputs">
          <label htmlFor="text-content" className="w-full">
            Content
            <br />
            <input
              className="input-field"
              type="text"
              id="text-content"
              name="text-content"
              placeholder="Text content"
              onChange={handlePropertyChange}
              value={selectedElement?.props.text || ""}
            />
          </label>
          <label htmlFor="font-family" className="w-full">
            Font Family
            <br />
            <select
              id="font-family"
              name="font-family"
              className="input-field"
              onChange={handlePropertyChange}
              value={selectedElement?.props.font.fontFamily || ""}
            >
              {fonts.map((font) => (
                <option key={font.fontFamily} value={font.fontFamily}>
                  {font.fontFamily}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="text-size" className="w-half">
            Fontsize
            <br />
            <input
              className="input-field"
              type="number"
              id="text-size"
              name="text-size"
              placeholder="Text size"
              min={12}
              onChange={handlePropertyChange}
              value={selectedElement?.props.size || ""}
            />
          </label>
          <label htmlFor="text-color" className="w-half">
            Text Color
            <br />
            <input
              className="input-field"
              type="color"
              id="text-color"
              name="text-color"
              placeholder="Text color"
              onChange={handlePropertyChange}
              value={selectedElement?.props.color ?? "#000000"}
            />
          </label>
        </div>
      </div>
    );
  }
}
