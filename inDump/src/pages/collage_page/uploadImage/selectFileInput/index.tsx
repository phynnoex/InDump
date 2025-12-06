import { Album02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import "./styles.scss"
type SelectFileInputProps = {
    images?: File[]
    setImages: (files: File[]) => void
}
export default function SelectFileInput({setImages }: SelectFileInputProps) {


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImages(Array.from(event.target.files || []))
    }
    return (
        <div className="selectFileInput">
            <input type="file" id="file" multiple style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
            <div className="imageIconContainer"><HugeiconsIcon
                icon={Album02Icon}
                size={24}
                stroke="1.5"
            /></div>
            <span>
                Choose a file or drag and drop it here JPEG,PNG, up to 5MB
            </span>
            <label htmlFor="file" id="button">
                Browse file
            </label>
        </div>
    )
}