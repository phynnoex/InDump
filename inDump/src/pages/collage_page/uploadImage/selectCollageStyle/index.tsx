import "./styles.scss"

type selectCollageStyleProps = {
    collageOptions: {
        label: string;
    }[]
}

export default function SelectCollageStyle({collageOptions}: selectCollageStyleProps) {
    return (
        <div className="select-collage-style">
            <div className="select-collage-style_heading">
                <h4>Select Collage Style</h4>
                <p>Choose a collage style that fits your images</p>
            </div>
            <div className="collage-style-options">
                {collageOptions.map((option) => (
                    <div key={option.label} className="collage-style-card">
                        <div className="icon_container"></div>
                        <span>{option.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}