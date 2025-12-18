import { Group, Image, Rect } from "react-konva"
import { useKonvaImage } from "../../../../../../hooks/useKonvaImage"



type GridComponentProps = {
    layout: {
        x: number,
        y: number,
        w: number,
        h: number
    },
    imageSrc: File
}

export default function GridComponent({ layout, imageSrc }: GridComponentProps) {
    const colors = ['#FFF230', '#13491cff', '#4d250fff'];
    const { konvaImage } = useKonvaImage({ image: imageSrc });

    if (!konvaImage) return null;


    // ----- object-fit: cover -----
    const imgW = konvaImage.width;
    const imgH = konvaImage.height;

    const fitScale = Math.max(layout.w / imgW, layout.h / imgH);
    const fitWidth = imgW * fitScale;
    const fitHeight = imgH * fitScale;
    const offsetX = (layout.w - fitWidth) / 2;
    const offsetY = (layout.h - fitHeight) / 2;



    return (
        <>
            <Group x={layout.x} y={layout.y} clipWidth={layout.w} clipHeight={layout.h} >
                <Rect width={layout.w} height={layout.h} fill={colors[layout.y % colors.length]} stroke={"white"} strokeWidth={4} />
                <Image
                    x={offsetX}
                    y={offsetY}
                    image={konvaImage}
                    width={fitWidth}
                    height={fitHeight}
                />
            </Group>
        </>
    )
}