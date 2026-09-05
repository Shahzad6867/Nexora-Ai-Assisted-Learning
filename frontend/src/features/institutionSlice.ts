import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { toast } from "sonner";
const initialState = {
  institution: null,
  instructors: [],
  courses: [],
  loading: true,
  error: null,
};

const fetchEntities = createAsyncThunk(
  "institution/fetchEntities",
  async (_id: string) => {
    try {
      const res = await api.get(`/institution/${_id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "an error occured");
    }
  }
);
const institutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.institution = action.payload.institution;
      state.instructors = action.payload.instructors;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEntities.fulfilled, (state, action) => {
      state.error = null;
      state.institution = action.payload.institution;
      state.instructors = action.payload.instructors;
      state.courses = action.payload.courses;
      state.loading = false;
    });
  },
});

export const { updateProfile } =
  institutionSlice.actions;
export { fetchEntities };
export default institutionSlice.reducer;
