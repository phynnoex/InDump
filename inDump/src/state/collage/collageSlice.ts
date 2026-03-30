import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CollageStyle = "Grid" | "PostCard" ;

interface CollageState {
    images: File[],
    size: { width: number, height: number },
    collageStyle: CollageStyle;
    selectedElementIds: string[] | null
}



const initialState: CollageState = {
    images: [],
    size: { width: 0, height: 0 },
    collageStyle: "Grid",
    selectedElementIds: null
}

// createSlice
const collageSlice = createSlice({
    initialState,
    name: "collage",
    reducers: {
        setImage: (state, action: PayloadAction<File>) => {
            state.images.push(action.payload);
        },
        setSize: (state, action: PayloadAction<{ width: number, height: number }>) => {
            state.size = action.payload;
        },
        setStyle: (state, action: PayloadAction<CollageStyle>) => {
            state.collageStyle = action.payload;
        },
        setSelectedElementIds: (state, action: PayloadAction<string[] | null>) => {
            state.selectedElementIds = action.payload;
        },
        
    }

})

export const { setImage, setSize, setStyle, setSelectedElementIds } = collageSlice.actions;
export default collageSlice.reducer