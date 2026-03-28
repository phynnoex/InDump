import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CollageStyle = "Grid" | "PostCard" ;

interface CollageState {
    images: File[],
    size: { width: number, height: number },
    collageStyle: CollageStyle;
    selectedElementId: string | null
}



const initialState: CollageState = {
    images: [],
    size: { width: 0, height: 0 },
    collageStyle: "Grid",
    selectedElementId: null
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
        setSelectedElementId: (state, action: PayloadAction<string | null>) => {
            state.selectedElementId = action.payload;
        },
    }

})

export const { setImage, setSize, setStyle, setSelectedElementId } = collageSlice.actions;
export default collageSlice.reducer