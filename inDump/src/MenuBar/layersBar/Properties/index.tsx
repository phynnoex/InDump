import "./styles.scss";
import type { elementIDType } from "../../../types/ElementIDTypeTypes";
import type { ElementsNode } from "../../../types/elementType";
import fonts from "../../../assets/fonts/fontLists";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../state/store";
import { setElements } from "../../../state/collage/collageSlice";

type selectedLayerType = {
  id: string;
  type: elementIDType;
};

type PropertiesBarProps = {
  selectedLayer: selectedLayerType;
};

export default function PropertiesBar({ selectedLayer }: PropertiesBarProps) {
  const Elements = useSelector((state: RootState) => state.elements.present);
  const dispatch = useDispatch<AppDispatch>();

  const handlePropertyChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "text-content" && selectedLayer?.type === "text") {
      const newElements = Elements.map((el) =>
        el.id === selectedLayer.id && el.type === "text"
          ? {
              ...el,
              props: {
                ...el.props,
                text: value,
              },
            }
          : el,
      );
      dispatch(setElements(newElements));
    }

    if (name === "text-size" && selectedLayer?.type === "text") {
      const newElements = Elements.map((el) =>
        el.id === selectedLayer.id && el.type === "text"
          ? {
              ...el,
              props: {
                ...el.props,
                size: Number(value),
              },
            }
          : el,
      );
      dispatch(setElements(newElements));
    }

    if (name === "font-family" && selectedLayer?.type === "text") {
      const selectedFont = fonts.find((font) => font.fontFamily === value);
      if (selectedFont) {
        const newElements = Elements.map((el) =>
          el.id === selectedLayer.id && el.type === "text"
            ? {
                ...el,
                props: {
                  ...el.props,
                  font: selectedFont,
                },
              }
            : el,
        );
        dispatch(setElements(newElements));
      }
    }

    if (name === "text-color" && selectedLayer?.type === "text") {
      const newElements = Elements.map((el) =>
        el.id === selectedLayer.id && el.type === "text"
          ? {
              ...el,
              props: {
                ...el.props,
                color: value,
              },
            }
          : el,
      );
      dispatch(setElements(newElements));
    }

    if (name === "text-opacity" && selectedLayer?.type === "text") {
      const newElements = Elements.map((el) =>
        el.id === selectedLayer.id && el.type === "text"
          ? {
              ...el,
              props: {
                ...el.props,
                opacity: Number(value),
              },
            }
          : el,
      );
      dispatch(setElements(newElements));
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
        <h4>Appearance</h4>
        <div className="inputs">
          <label htmlFor="text-opacity" className="w-full">
            Opacity
            <br />
            <input
              className="input-field"
              type="number"
              id="text-opacity"
              name="text-opacity"
              placeholder="Opacity"
              min={0}
              max={1}
              step={0.1}
              onChange={handlePropertyChange}
              value={selectedElement?.props.opacity ?? 1}
            />
          </label>
        </div>
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
