import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CollageStyle = "Grid" | "PostCard" ;

interface CollageState {
    images: File[],
    size: { width: number, height: number },
    collageStyle: CollageStyle;
    stageDeselect: boolean
}



const initialState: CollageState = {
    images: [],
    size: { width: 0, height: 0 },
    collageStyle: "Grid",
    stageDeselect: false
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
        setStageDeselect: (state, action: PayloadAction<boolean>) => {
            state.stageDeselect = action.payload;
        },
    }

})

export const { setImage, setSize, setStyle, setStageDeselect } = collageSlice.actions;
export default collageSlice.reducer