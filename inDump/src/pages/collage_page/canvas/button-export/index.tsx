
import React, {  useState } from "react"
import { ArrowDown01FreeIcons, FileExportFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import "./styles.scss"
import { motion } from "framer-motion";
import Konva from "konva";

type ButtonProps = {
    ArtboardRef: React.RefObject<{ getStage: () => Konva.Stage | null } | null>
}

export default function ButtonExport({ ArtboardRef }: ButtonProps) {
    const [hovered, setHovered] = useState<boolean>(false)
    const [buttonClicked, setButtonClicked] = useState<boolean>(false)

    const handleExport = (imageType: "image/jpeg" | "image/png") => {
        const stage = ArtboardRef.current?.getStage();
        if (!stage) {
            console.log("no")
            return
        }
        const dataURL = stage.toDataURL({
            mimeType: imageType,
            pixelRatio: 1 // double resolution
        });

        const link = document.createElement('a');
        link.download = imageType === "image/jpeg" ? 'stage.jpg' : 'stage.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="button-export-container">
            <motion.div className="button-export"
                onClick={() => {setButtonClicked(!buttonClicked)}}
                onHoverStart={
                    () => { setHovered(true) }
                }
                layoutId="export-button">

                <HugeiconsIcon icon={FileExportFreeIcons} size={24} stroke="1.5" />
                {hovered ? <><div>export</div><HugeiconsIcon icon={ArrowDown01FreeIcons}></HugeiconsIcon></> : ""}
                {/* {hovered ? <HugeiconsIcon icon={ArrowDown01FreeIcons}> : ""} */}
            </motion.div>
            {buttonClicked && (
                <div className="imageTypeBtnContainer">
                    <button onClick={() => {handleExport("image/png")}}>png</button>
                    <div className="divider"/>
                    <button onClick={() => {handleExport("image/jpeg")}}>jpg</button>
                </div>
            )

            }
        </div>
    )
}