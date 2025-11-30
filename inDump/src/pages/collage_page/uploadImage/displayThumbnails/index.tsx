import "./styles.scss"

type DisplayThumbnailsProps = {
    images: File[]
}

export default function DisplayThumbnails({ images }: DisplayThumbnailsProps) {
    return (
        <div className="display-thumbnails">
            <div className="display-thumbnails_heading">Uploads</div>
            <div className="display-thumbnails_container">
                {images.map((image, index) => (
                    <div key={index} className="thumbnail">
                        <img src={URL.createObjectURL(image)} alt={`Thumbnail ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    )
    
}