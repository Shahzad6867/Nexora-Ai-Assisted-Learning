import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    otpDetails : null,
    loading : false,
    error : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        startVerification : (state,action) => {
            state.otpDetails = action.payload.data
            state.error = null
        },
        
    }
})

export const {startVerification} = authSlice.actions
export default authSlice.reducer



