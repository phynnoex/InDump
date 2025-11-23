import "./styles.scss"
import { PlusSignIcon } from "@hugeicons/core-free-icons";

import Canvas from "./canvas"
import { HugeiconsIcon } from "@hugeicons/react";
import ButtonExport from "./canvas/button-export";



export default function CollagePage() {
    return (
        <div className="collagePage">
            <div className="collagePage_left">
                
                <Canvas />
                <div className="menu-bar">
                    <button className="menu-bar_button">
                        <HugeiconsIcon
                            icon={PlusSignIcon}
                            size={24}
                            stroke="1.5"
                            

                        />
                    </button>
                </div>
            </div>
        </div>
    )
}