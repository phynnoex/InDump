import { useContext, useMemo, } from "react"
import { Image, Text } from "react-konva"
import { useKonvaImage } from "../../../../../hooks/useKonvaImage"
import computeLayout from "../../../../../services/normalizeLayoutShapes/computeLyout"
import addOrganicVariation from "../../../../../services/addOrganicVariations"
import PostCardWrapper from "./postCardWrapper"
import { useSelector } from "react-redux"
import { type RootState } from "../../../../../state/store"
import useImage from "use-image"
import bg from "../../../../../assets/bgs/background1.jpg"
import CustomText from "../../../../../components/addText"


type PostCardProps = {
    canvasWidth: number,
    canvasHeight: number
}
type fontObject = {
    link: string,
    fontFamily: string
}

export default function PostCards({ canvasHeight, canvasWidth }: PostCardProps) {
    const images = useSelector((state: RootState) => state.images)
    const [bgImage] = useImage(bg ?? "")

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
            <CustomText text="August Dump" font={{fontFamily:"Carattere", link:'https://fonts.googleapis.com/css2?family=Carattere&display=swap'}} size={20}/>
            {images.map((image, i) => {

                return (
                    <PostCardWrapper key={i} imageSrc={image} layout={layout[i]} />
                );
            })}
        </>

    )
}