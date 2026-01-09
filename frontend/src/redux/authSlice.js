import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: true,
        user: null,
    },
    reducers:{
        setIsLoading: (state, action)=>{
            state.isLoading= action.payload
        },
        setUser: (state, action)=>{
            state.user= action.payload;
            state.isLoading = false;
        },
        logout: (state, action)=>{
            state.user= null
        },
    }
});
export const {setIsLoading, setUser, logout} = authSlice.actions;
export default authSlice.reducer; 