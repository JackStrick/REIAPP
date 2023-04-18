import { createSlice } from "@reduxjs/toolkit";

//Initial Dark Mode
const initialState = {
    mode: 'light',//User.lightmode preference
};


//Change Color Mode
export const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? "dark" : 'light';
        }
    }
})

export const { setMode } = modeSlice.actions;

export default modeSlice.reducer;