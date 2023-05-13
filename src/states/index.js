import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    mode : "light",
    user : "",
    userData:""
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers:{
        setMode : (state)=>{
            state.mode =state.mode === "light" ? "dark" : "light";
        },
        setUser : (state,data)=>{
            state.user = data;
        },
        setUserData: (state, data)=>{
            state.userData = data;
        }
    }
})

export const {setMode,setUser, setUserData} = globalSlice.actions;
export default globalSlice.reducer