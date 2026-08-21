import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/auth";
const initialState = {
  institutions: [],
  instructors: [],
  students: [],
  requests : [],
  loading : true,
  error: null,
};
const fetchEntities = createAsyncThunk(
  "admin/fetchEntities",
  async () => {
    try {
      const institutions = await api.get(`/admin/institutions`);
        const students = await api.get(`/admin/students`);
        const requests = await api.get("/admin/requests")
        const instructors = await api.get("/admin/instructors")

      return {
        institutions : institutions.data.institutions,
        students  : students.data.students,
        requests  : requests.data.students,
        instructors : instructors.data.instructors
      };
    } catch (error) {
      console.log(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
  },
  extraReducers : builder => {
    builder.addCase(fetchEntities.fulfilled,(state,action) => {
        state.error = null
        state.institutions = action.payload.institutions
        state.students = action.payload.students
        state.requests = action.payload.requests
        state.instructors = action.payload.instructors
        state.loading  = false
    })
}
});

export const {} = adminSlice.actions;
export {fetchEntities}
export default adminSlice.reducer;
