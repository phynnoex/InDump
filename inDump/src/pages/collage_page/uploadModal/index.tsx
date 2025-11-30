import { Cancel01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import "./styles.scss"


type UploadModalProps = {
    setIsButtonClicked: (value: boolean) => void
    children: ReactNode
}



export default function UploadModal({ children,setIsButtonClicked }: UploadModalProps) {
    return (
        <div className="uploadModalContainer">
            <motion.div className="uploadModal"
                style={{transformOrigin: "bottom center"}}
                initial={{  opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{  opacity: 0, y: 100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="cancelContainer">
                    <motion.button className="cancelButton" layoutId="modalToggleButton" onClick={() => {setIsButtonClicked && setIsButtonClicked(false)}}>
                        <HugeiconsIcon
                            icon={Cancel01FreeIcons}

                        />
                    </motion.button>
                </div>
                {children}
            </motion.div>
        </div>
    )
}