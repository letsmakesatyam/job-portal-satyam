import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
    },
    reducers:{
        setIsLoading: (state, action)=>{
            state.isLoading= action.payload
        },


    }
});
export const {setIsLoading} = authSlice.actions;
export default authSlice.reducer; 