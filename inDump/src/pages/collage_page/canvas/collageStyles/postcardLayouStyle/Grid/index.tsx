
import { Group } from "react-konva"
import { GRIDSHAPES } from "./gridLayoutShapes"
import { type RootState } from "../../../../../../state/store"

import GridComponent from "./gridComponent"
import { useSelector } from "react-redux"

type GridStyleProps = {
    canvasWidth: number,
    canvasHeight: number
}






export default function GridStyle({ canvasHeight, canvasWidth }: GridStyleProps) {
    const nomalizeGrid = (count: number, canvasWidth: number, canvasHeight: number) => {
        const shape = GRIDSHAPES[count];

        if (!shape) throw new Error(`No layout defined for ${count} items`);

        return shape.map(p => ({
            x: p.x * canvasWidth,
            y: p.y * canvasHeight,
            h: p.h * canvasHeight,
            w: p.w * canvasWidth,
        }));
    }

    const images = useSelector((state: RootState) => state.images)
    const nomalizedshape = nomalizeGrid(images.length, canvasWidth, canvasHeight)


    return (
        <>
            <Group>
                {
                    images.map((image, index) => (
                        <GridComponent layout={nomalizedshape[index]} imageSrc={image} />

                    ))
                }
            </Group>
        </>

    )
}