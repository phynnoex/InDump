import ButtonExport from "./button-export"
import "./styles.scss"
export default function Canvas() {
    return(
        <div className="canvas">
            <ButtonExport/>
            <div className="canvas_background">
                <canvas className="canvas-element"> 

                </canvas>
            </div>
        </div>
    )
}