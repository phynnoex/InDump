import { HugeiconsIcon } from "@hugeicons/react"
import "./styles.scss"
import { Upload04Icon } from "@hugeicons/core-free-icons"
import SelectFileInput from "./selectFileInput"
import DisplayThumbnails from "./displayThumbnails"
import { useContext } from "react"
import { CollageContext } from "../../../collageContext"



export default function UploadImage() {

    const { images, setImages } = useContext(CollageContext)
   
    return (
        <div className="upload-image">
            <div className="upload-image_top">
                <div className="selectImageContainer">
                    <HugeiconsIcon
                        icon={Upload04Icon}
                        size={24}
                        stroke="1.5"
                    />

                </div>
                <div className="selectImageText"><h4>Select Image</h4><p>Select and upload pictures you want to collage</p></div>
                <div className="selectImageDescription"></div>
            </div>
            <div className="upload-image_middle">
                <SelectFileInput images={images} setImages={setImages} />
            </div>
            <div className="upload-image_bottom">
                <DisplayThumbnails images={images} />
            </div>
        </div>
    )
}