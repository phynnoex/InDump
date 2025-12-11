
import Konva from "konva";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Stage } from "react-konva"


type ArtboardHandle = {
    getStage: () => Konva.Stage | null;
}

type ArtboardProps = {
    width: number;
    height: number;
    children?: React.ReactNode;

}

// forward ref to pass the stageRef from the child to the parent
const Artboard = forwardRef<ArtboardHandle, ArtboardProps>(({ width, height, children }, ref) => {
    const stageRef = useRef<Konva.Stage | null>(null);


    //use Imperative handle
    useImperativeHandle(ref, () => ({
        getStage: () => stageRef.current
    }))

    return (
        <>
            {width > 0 && height > 0 && (<Stage width={width} height={height} ref={stageRef}>
                {children}

            </Stage>)}
        </>
    )
})

export default Artboard