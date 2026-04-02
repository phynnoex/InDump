import { useDispatch, useSelector } from "react-redux";
import "./styles.scss"

import type { AppDispatch, RootState } from "../../../../state/store";
import { setSize } from "../../../../state/collage/collageSlice";

type SelectSizeProps = {
    sizeOptions: {
        label: string;
        width: number;
        height: number;
    }[]
}




export default function SelectSize({ sizeOptions }: SelectSizeProps) {
    const size = useSelector((state: RootState) => state.size)
    const dispatch = useDispatch<AppDispatch>()    // console.log(width, height)

    const selectButtonHandler = (width: number, height: number) => {
        dispatch(setSize({ width: width, height: height }))
    }

    return (
        <div className="select-size">
            <h4>Size</h4>
            <div className="size-options">
                {sizeOptions.map((option) => (
                    <button key={option.label} className={`option-card ${(size.width === option.width && size.height === option.height) ? "selected" : ""}`} onClick={() => selectButtonHandler(option.width, option.height)}>
                        <div className="size-label">{option.label}</div>
                        <div className="size-details">  {option.width} x {option.height}</div>
                    </button>
                ))}
            </div>
        </div>
    )
}