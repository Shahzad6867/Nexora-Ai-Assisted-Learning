import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/auth";
const initialState = {
  request : null,
  loading : true,
  error: null,
};
const fetchRequest = createAsyncThunk(
  "institution/fetchRequest",
  async (_id : string) => {
    try {
      const res = await api.get(`/requests/${_id}`);
      return res.data.request;
    } catch (error) {
      console.log(error.message);
    }
  }
);
const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    updateRequest : (state,action) => {
        state.request = action.payload
    }
  },
  extraReducers : builder => {
    builder.addCase(fetchRequest.fulfilled,(state,action) => {
        state.error = null
        state.request = action.payload
        state.loading = false
    })
}
});

export const {updateRequest} = requestSlice.actions;
export {fetchRequest}
export default requestSlice.reducer;
