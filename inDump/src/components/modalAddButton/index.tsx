import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";


interface ModalAddButtonProps {
    isButtonClicked: boolean;
    setIsButtonClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalAddButton({ isButtonClicked, setIsButtonClicked }: ModalAddButtonProps) {
    return (
        <div className="menu-bar">
            <motion.button
                layoutId="modalToggleButton" className="menu-bar_button" onClick={() => {
                    setIsButtonClicked(!isButtonClicked)
                }}>
                <HugeiconsIcon
                    icon={PlusSignIcon}
                    size={24}
                    stroke="1.5"


                />
            </motion.button>
        </div>
    )
}