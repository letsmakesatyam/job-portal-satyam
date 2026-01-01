import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        user: null,
    },
    reducers:{
        setIsLoading: (state, action)=>{
            state.isLoading= action.payload
        },
        setUser: (state, action)=>{
            state.user= action.payload
        },
        logout: (state, action)=>{
            state.user= null
        },
    }
});
export const {setIsLoading, setUser, logout} = authSlice.actions;
export default authSlice.reducer; 