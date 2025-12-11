import { CollageContext } from "../../../../collageContext";
import "./styles.scss"
import { useContext } from "react";

type SelectSizeProps = {
    sizeOptions: {
        label: string;
        width: number;
        height: number;
    }[]
}




export default function SelectSize({ sizeOptions }: SelectSizeProps) {
    const { setSize, size } = useContext(CollageContext);
    const selectButtonHandler = (width: number, height: number) => {
        // console.log(width, height)
        setSize(prev => ({
            ...prev, width: width, height: height
        }))
    }

    return (
        <div className="select-size">
            <h4>Size</h4>
            <div className="size-options">
                {sizeOptions.map((option) => (
                    <button key={option.label} className={`option-card ${(size.width === option.width && size.height === option.height) ? "selected" : ""}`} onClick={() => selectButtonHandler(option.width, option.height)}>
                        <span>{option.label}</span>
                        <span>  {option.width} x {option.height}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}