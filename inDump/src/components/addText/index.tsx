import { useEffect, useState } from "react";
import { Text } from "react-konva"

type fontObject = {
    link: string,
    fontFamily: string
}
interface CustomTextProps {
    text: string,
    font: fontObject,
    size: number
    color?: string
    opacity?: number
}

export default function CustomText({ text, font, size, color, opacity }: CustomTextProps) {

    const [fontLoaded, setFontLoaded] = useState<boolean>(false)


    async function loadFont(fontFamily: string) {
        await document.fonts.load(`16px ${fontFamily}`);
        await document.fonts.ready;
    }

    function addGoogleFont(font: string) {
        const link = document.createElement("link");

        link.href = font;

        link.rel = "stylesheet";

        document.head.appendChild(link);
    }

    useEffect(() => {
        const load = async () => {
            addGoogleFont(font.link)

            await loadFont(font.fontFamily);

            setFontLoaded(true);
        };

        load();
    }, []);

    return (
        <Text
            opacity={opacity}
            x={window.innerWidth / 2}
            y={15}
            text={text}
            fontSize={size}
            fontFamily={fontLoaded ? font.fontFamily : "Arial"}
            fill={color || "#000000"}
            offsetX={60} // Approximate half width
            onDragStart={() => { console.log(`${text} clciked`) }}
            
        />
    )
}