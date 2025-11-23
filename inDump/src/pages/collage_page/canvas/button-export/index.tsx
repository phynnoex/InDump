
import { useState } from "react"
import { ArrowDown01FreeIcons, FileExportFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import "./styles.scss"
import { motion } from "framer-motion";

export default function ButtonExport() {
    const [hovered, setHovered] = useState<boolean>(false)
    return (
        <motion.div className="button-export" onHoverStart={
            () => { setHovered(true) }
        } layoutId="export-button">

            <HugeiconsIcon icon={FileExportFreeIcons} size={24} stroke="1.5" />
            {hovered ? <><div>export</div><HugeiconsIcon icon={ArrowDown01FreeIcons}></HugeiconsIcon></> : ""}
            {/* {hovered ? <HugeiconsIcon icon={ArrowDown01FreeIcons}> : ""} */}
        </motion.div>
    )
}