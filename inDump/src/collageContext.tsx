import { createContext, useState } from "react";


type CollageContextType = {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    size: { width: number; height: number };
    setSize: React.Dispatch<React.SetStateAction<{ width: number, height: number }>>;
    collageStyle: string;
    setCollageStyle: React.Dispatch<React.SetStateAction<string>>;
}

const CollageContext = createContext<CollageContextType>(
    {
        images: [],
        setImages: () => { },
        size: { width: 0, height: 0 },
        setSize: () => { },
        collageStyle: "",
        setCollageStyle: () => { }
    }
)

const CollageProvider = ({ children }: { children: React.ReactNode }) => {
    const [images, setImages] = useState<File[]>([])
    const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
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
            {children}
        </CollageContext.Provider>

    )
}

export { CollageContext, CollageProvider };