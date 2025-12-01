import "./styles.scss"
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import Canvas from "./canvas"
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { motion } from "framer-motion";
import UploadModal from "./uploadModal";
import { AnimatePresence } from "framer-motion";
import UploadImage from "./uploadImage";
import SelectSize from "./uploadImage/selectSize";
import SelectCollageStyle from "./uploadImage/selectCollageStyle";

type sizeOption = {
    label: string;
    width: number;
    height: number;
}
type collageOptions = {
    label: string;
}

export default function CollagePage() {
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const sizeOptions: sizeOption[] = [
        { label: "1:1", width: 1080, height: 1080 },
        { label: "4:5", width: 1080, height: 1350 },
        { label: "9:16", width: 1080, height: 1920 },
    ]
    const collageOptions: collageOptions[] = [
        { label: "Grid" },
        { label: "Freeform" },
        { label: "Mosaic" },
        { label: "Circular" },
        { label: "Abstract" },
        
    ]

    return (
        <>
            <div className="collagePage">
                <div className="collagePage_left">

                    <Canvas />
                    <div className="menu-bar">
                        <motion.button
                            layoutId="modalToggleButton" className="menu-bar_button" onClick={() => {
                                setIsButtonClicked(!isButtonClicked)
                                console.log(isButtonClicked)
                            }}>
                            <HugeiconsIcon
                                icon={PlusSignIcon}
                                size={24}
                                stroke="1.5"


                            />
                        </motion.button>
                    </div>
                </div>
            </div>
            <AnimatePresence>{isButtonClicked ? <UploadModal setIsButtonClicked={setIsButtonClicked}>
                <UploadImage />
                <SelectSize sizeOptions={sizeOptions} />
                <SelectCollageStyle collageOptions={collageOptions}></SelectCollageStyle>
            </UploadModal> : ""}
            </AnimatePresence>
        </>
    )
}