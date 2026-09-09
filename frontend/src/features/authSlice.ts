import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import api from "../api/api";
import { toast } from "sonner";


const initialState = {
    otpDetails : null,
    loading : true,
    token : null
}
const logoutEntity = createAsyncThunk(
    "auth/logoutEntity",
    async (_, { dispatch, rejectWithValue }) => {
      try {
        await api.get("/logout");
      } catch (error) {
        const errorMessage = error.response?.data?.error || "An error occurred";
        console.error("Logout API Error:", error);
        toast.error(errorMessage);
        
        return rejectWithValue(errorMessage);
      } finally {
        dispatch({ type: "auth/logout" });
      }
    }
  );
  

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        startVerification : (state,action) => {
            state.otpDetails = action.payload.data
        },
        setToken : (state,action) => {
            state.otpDetails = null
            state.token = action.payload.data
            state.loading = false
        } ,
        setLoadingFalse : (state) => {
            state.loading = false
        },
        clearAuthState : (state) => {
            state.otpDetails = null
        }
    },
    extraReducers : (builder) => {
        builder.addCase(logoutEntity.fulfilled,(state) => {
            state.loading = false
        })
    }
})

export const {startVerification,setToken,setLoadingFalse,clearAuthState} = authSlice.actions
export {logoutEntity}
export default authSlice.reducer



