import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/auth";
const initialState = {
  institution: null,
  instructors : [],
  request : null,
  loading : true,
  error: null,
};

const fetchEntities = createAsyncThunk(
    "institution/fetchEntities",
    async (_id : string) => {
      try {
        const res = await api.get(`/institution/${_id}`);
        return res.data
      } catch (error) {
        console.log(error.message);
      }
    }
  );
const institutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {
    updateProfile : (state,action) => {
        state.institution = action.payload.institution
        state.instructors = action.payload.instructors
    }
  },
  extraReducers : builder => {
    builder.addCase(fetchEntities.fulfilled,(state,action) => {
        state.error = null
        state.institution = action.payload.institution
        state.instructors = action.payload.instructors
        state.loading = false
    })
}
});

export const {updateProfile} = institutionSlice.actions;
export {fetchEntities}
export default institutionSlice.reducer;
