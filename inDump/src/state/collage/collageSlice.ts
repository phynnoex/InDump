import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CollageState {
    images: File[],
    size: { width: number, height: number },
    collageStyle: string
}

const initialState: CollageState = {
    images: [],
    size: { width: 0, height: 0 },
    collageStyle: ""
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
        setStyle: (state, action: PayloadAction<string>) => {
            state.collageStyle = action.payload;
        },
    }

})

export const { setImage, setSize, setStyle } = collageSlice.actions;
export default collageSlice.reducer