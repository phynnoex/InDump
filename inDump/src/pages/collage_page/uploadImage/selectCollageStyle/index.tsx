import "./styles.scss"
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../../../../state/store";
import { setStyle } from "../../../../state/collage/collageSlice";

type selectCollageStyleProps = {
    collageOptions: {
        label: "Grid" | "PostCard";
    }[]
}

export default function SelectCollageStyle({ collageOptions }: selectCollageStyleProps) {
    const collageStyle = useSelector((state: RootState) => state.collageStyle)
    const dispatch = useDispatch<AppDispatch>()

    const selectButtonHandler = (label: "Grid" | "PostCard") => {
        dispatch(setStyle(label))
    }

    return (
        <div className="select-collage-style">
            <div className="select-collage-style_heading">
                <h4>Select Collage Style</h4>
                <p>Choose a collage style that fits your images</p>
            </div>
            <div className="collage-style-options">
                {collageOptions.map((option) => (
                    <div key={option.label} className={`collage-style-card ${collageStyle === option.label ? "selected" : ""}`} onClick={() => selectButtonHandler(option.label)}>
                        <div className="icon_container"></div>
                        <span>{option.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}