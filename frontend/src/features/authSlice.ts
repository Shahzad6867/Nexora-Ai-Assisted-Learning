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
    async (_,{dispatch}) => {
      try {
         await api.get("logout");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error || "an error occured");
      }finally{
        dispatch({type : "auth/logout"})
        toast.success("Logged out")
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
    }
})

export const {startVerification,setToken,setLoadingFalse,clearAuthState} = authSlice.actions
export {logoutEntity}
export default authSlice.reducer



