import { useContext, useEffect, useMemo, useState } from "react"
import { Group, Image, Rect } from "react-konva"
import { CollageContext } from "../../../../../collageContext"
import { useKonvaImage } from "../../../../../hooks/useKonvaImage"
import computeLayout from "../../../../../services/normalizeLayoutShapes/computeLyout"
import addOrganicVariation from "../../../../../services/addOrganicVariations"
import PostCardWrapper from "./postCardWrapper"


type PostCardProps = {
    bgSize: {
        height: number,
        width: number
    }
}


export default function PostCards({ bgSize }: PostCardProps) {
    const { images } = useContext(CollageContext)
    const { konvaImage: bgImage } = useKonvaImage({ image: images[0] });

    const layout = useMemo(() => {
        const rawPoints = computeLayout(images.length, bgSize.width, bgSize.height);
        return rawPoints.map(p => addOrganicVariation(p));
    }, [images.length, bgSize.width, bgSize.height]);


    return (
        <>
            <Image
                x={0}
                y={0}
                image={bgImage}
                width={bgSize.width}
                height={bgSize.height}
            />
            {images.map((image, i) => {

                return (
                    <PostCardWrapper key={i} imageSrc={image} layout={layout[i]} />
                );
            })}
        </>

    )
}