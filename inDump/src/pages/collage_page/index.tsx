import "./styles.scss"
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import Canvas from "./canvas"
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { motion } from "framer-motion";
import UploadModal from "./uploadModal";
import { AnimatePresence } from "framer-motion";
import UploadImage from "./uploadImage";



export default function CollagePage() {
    const [isButtonClicked, setIsButtonClicked] = useState(false)
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
            </UploadModal> : ""}
            </AnimatePresence>
        </>
    )
}