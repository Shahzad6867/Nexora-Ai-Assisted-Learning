import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { toast } from "sonner";
const initialState = {
  instructor : null,
  subjects: [],
  loading: true,
  error: null,
};

const fetchEntities = createAsyncThunk(
  "instructor/fetchEntities",
  async (_id: string) => {
    try {
      const instructor = await api.get(`/instructors/${_id}`);
      const subjects = await api.get(`/subjects/instructor/${_id}`);
      return {
        instructor : instructor.data.data,
        subjects : subjects.data.data
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "an error occured");
    }
  }
);
const instructorSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchEntities.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
    .addCase(fetchEntities.fulfilled, (state, action) => {
      state.error = null;
      state.instructor = action.payload.instructor;
      state.subjects = action.payload.subjects;
      state.loading = false;
    });
  },
});

// export {} = instructorSlice.actions
export { fetchEntities };
export default instructorSlice.reducer;
