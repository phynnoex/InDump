import { useEffect, useState } from "react";
import useImage from "use-image";

type useKonVaImageProps = {
    image: File
}

export const useKonvaImage = ({ image }: useKonVaImageProps) => {

    const [imageUrl, setImageUrl] = useState<string | null>(null)

    useEffect(() => {
        if (!image) return;

        const url = URL.createObjectURL(image);
        setImageUrl(url)

        return () => {
            URL.revokeObjectURL(url); // cleanup
        };
    }, [image]);

    const [konvaImage] = useImage(imageUrl ?? "");
    return { konvaImage }
}