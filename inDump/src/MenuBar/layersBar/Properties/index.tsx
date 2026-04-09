import "./styles.scss";
import type { elementIDType } from "../../../types/ElementIDTypeTypes";

import fonts from "../../../assets/fonts/fontLists";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../state/store";
import { setElements } from "../../../state/collage/collageSlice";
import type { ElementsNode } from "../../../types/elementType";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

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
  const isMobile = useMediaQuery("(max-width: 768px)");

  const updateElementOpacity = <T extends ElementsNode>(
    el: T,
    opacity: number,
  ): T => {
    return {
      ...el,
      props: {
        ...el.props,
        opacity,
      },
    } as T;
  };

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

    if (name === "general-opacity" && selectedLayer) {
      const newElements = Elements.map((el) => {
        if (el.id !== selectedLayer.id) {
          return el;
        }

        return updateElementOpacity(el, Number(value));
      });
      dispatch(setElements(newElements));
    }
  };

  const selectedElement = Elements.find((el) => el.id === selectedLayer?.id);

  return (
    <div className="propertiesBar">
      {!isMobile && <h3>Properties</h3>}

      <h4 className="prop-section-title">Appearance</h4>

      {/* appearance properties */}

      <div className="inputs ">
        <label htmlFor="general-opacity" className=" label-text small-input">
          Opacity
          <br />
          <input
            className="input-field"
            type="number"
            id="general-opacity"
            name="general-opacity"
            placeholder="Opacity"
            min={0}
            max={1}
            step={0.1}
            onChange={handlePropertyChange}
            value={selectedElement?.props.opacity ?? 1}
          />
        </label>
        <label htmlFor="position-x" className=" label-text small-input">
          Position X
          <br />
          <input
            className="input-field"
            type="number"
            id="position-x"
            name="position-x"
            placeholder="Position X"
            disabled
            value={selectedElement?.props.position?.x?.toFixed(2) ?? 0}
          />
        </label>
        <label htmlFor="position-y" className="label-text small-input">
          <br />
          <input
            className="input-field"
            type="number"
            id="position-y"
            name="position-y"
            placeholder="Position Y"
            disabled
            value={selectedElement?.props.position?.y?.toFixed(2) ?? 0}
          />
        </label>
      </div>

      <div className="border-line"></div>

      {selectedElement?.type === "text" && (
        <>
          {" "}
          <h4 className="prop-section-title">Typography</h4>
          <div className="inputs">
            <label htmlFor="text-content" className="w-full label-text">
              Content
              <br />
              <input
                className="input-field"
                type="text"
                id="text-content"
                name="text-content"
                placeholder="Text content"
                onChange={handlePropertyChange}
                value={selectedElement?.props.text ?? ""}
              />
            </label>
            <label htmlFor="font-family" className="w-full label-text">
              Font Family
              <br />
              <select
                id="font-family"
                name="font-family"
                className="input-field"
                onChange={handlePropertyChange}
                value={selectedElement?.props.font.fontFamily ?? "Select Font"}
              >
                {fonts.map((font) => (
                  <option key={font.fontFamily} value={font.fontFamily}>
                    {font.fontFamily}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="text-size" className="w-half label-text">
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
                value={selectedElement?.props.size ?? 12}
              />
            </label>
            <label htmlFor="text-color" className="w-half label-text">
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
        </>
      )}
    </div>
  );
}
