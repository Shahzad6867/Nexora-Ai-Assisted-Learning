import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { toast } from "sonner";
const initialState = {
  request: null,
  loading: true,
  error: null,
};
const fetchRequest = createAsyncThunk(
  "institution/fetchRequest",
  async (_id: string) => {
    try {
      const res = await api.get(`/requests/${_id}`);
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "an error occured");
    }
  }
);
const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    updateRequest: (state, action) => {
      state.request = action.payload;
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequest.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchRequest.fulfilled, (state, action) => {
        state.error = null;
        state.request = action.payload;
        state.loading = false;
      });
  },
});

export const { updateRequest } = requestSlice.actions;
export { fetchRequest };
export default requestSlice.reducer;
