//define store
import { configureStore } from "@reduxjs/toolkit";
import collageReducer from "./collage/collageSlice"


// define store using configurestore 
export const store = configureStore({
    reducer: collageReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>