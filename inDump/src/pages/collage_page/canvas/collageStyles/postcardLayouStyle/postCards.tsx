import { useContext, useMemo, } from "react"
import { Image } from "react-konva"
import { useKonvaImage } from "../../../../../hooks/useKonvaImage"
import computeLayout from "../../../../../services/normalizeLayoutShapes/computeLyout"
import addOrganicVariation from "../../../../../services/addOrganicVariations"
import PostCardWrapper from "./postCardWrapper"
import { useSelector } from "react-redux"
import { type RootState } from "../../../../../state/store"


type PostCardProps = {
    canvasWidth: number,
    canvasHeight: number
}

export default function PostCards({ canvasHeight, canvasWidth }: PostCardProps) {
    const images = useSelector((state:RootState) => state.images)
    const { konvaImage: bgImage } = useKonvaImage({ image: images[0] });

    const layout = useMemo(() => {
        const rawPoints = computeLayout(images.length, canvasWidth, canvasHeight);
        return rawPoints.map(p => addOrganicVariation(p));
    }, [images.length, canvasWidth, canvasHeight]);


    return (
        <>
            <Image
                x={0}
                y={0}
                image={bgImage}
                width={canvasWidth}
                height={canvasHeight}
            />
            {images.map((image, i) => {

                return (
                    <PostCardWrapper key={i} imageSrc={image} layout={layout[i]} />
                );
            })}
        </>

    )
}