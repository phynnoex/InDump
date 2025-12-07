import { createContext, useState } from "react";


type CollageContextType = {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    size: string;
    setSize: (size: string) => void;
    collageStyle: string;
    setCollageStyle: (style: string) => void;
}

const CollageContext = createContext<CollageContextType>(
    {
        images: [],
        setImages: () => { },
        size: "",
        setSize: () => { },
        collageStyle: "",
        setCollageStyle: () => { }
    }
)

const CollageProvider = ({ children }: { children: React.ReactNode }) => {
    const [images, setImages] = useState<File[]>([])
    const [size, setSize] = useState<string>("")
    const [collageStyle, setCollageStyle] = useState<string>("")
    return (

        <CollageContext.Provider value={{
        images,
            setImages,
            size,
            setSize,
            collageStyle,
            setCollageStyle
    }
}>
    { children }
    </CollageContext.Provider>
    
    )
}

export { CollageContext, CollageProvider };