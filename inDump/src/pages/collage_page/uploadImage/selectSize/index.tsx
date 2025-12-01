import "./styles.scss"
type SelectSizeProps = {
    sizeOptions: {
        label: string;
        width: number;
        height: number;
    }[]
}




export default function SelectSize({ sizeOptions }: SelectSizeProps) {
    return (
        <div className="select-size">
            <h4>Size</h4>
            <div className="size-options">
                {sizeOptions.map((option) => (
                    <button key={option.label} className="option-card">
                        <span>{option.label}</span>
                        <span>  {option.width} x {option.height}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}