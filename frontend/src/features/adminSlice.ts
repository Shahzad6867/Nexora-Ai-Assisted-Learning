import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { toast } from "sonner";
// 1. Define typescript types for clarity
interface FetchEntitiesArgs {
  page?: number;
  itemsPerPage?: number;
  sortBy?: string;
  searchByEntity?: {
    search: string;
    entity: string;
  };
}
const initialState = {
  institutions: {
    documents: [],
    totalPages: 0,
  },
  instructors: {
    documents: [],
    totalPages: 0,
  },
  students: {
    documents: [],
    totalPages: 0,
  },
  requests: {
    documents: [],
    totalPages: 0,
  },
  totalPages: 0,
  loading: true,
  error: null,
};

const fetchEntities = createAsyncThunk(
  "admin/fetchEntities",
  async (args: FetchEntitiesArgs = {}, { rejectWithValue }) => {
    const {
      page = 1,
      itemsPerPage = 10,
      sortBy = "newest",
      searchByEntity,
    } = args;

    const buildUrl = (entity: string) => {
      const params = new URLSearchParams({
        page: String(page),
        itemsPerPage: String(itemsPerPage),
        sortBy,
      });
      if (
        searchByEntity &&
        searchByEntity.search.length > 0 &&
        searchByEntity.entity === entity
      ) {
        params.append("search", searchByEntity.search);
      }
      if (entity === "requests") {
        params.delete("sortBy");
      }
      return `/admin/${entity}?${params.toString()}`;
    };

    try {
      const [institutions, students, requests, instructors] = await Promise.all(
        [
          api.get(buildUrl("institutions")),
          api.get(buildUrl("students")),
          api.get(buildUrl("requests")),
          api.get(buildUrl("instructors")),
        ]
      );

      return {
        institutions: institutions.data.data,
        students: students.data.data,
        requests: requests.data.data,
        instructors: instructors.data.data,
      };
    } catch (error: any) {
      toast.error(error.response?.data?.error || "An error occurred");
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminState: (state) => {
      state.institutions = null;
      state.instructors = null;
      state.requests = null;
      state.students = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntities.fulfilled, (state, action) => {
        state.error = null;
        state.institutions = action.payload.institutions;
        state.students = action.payload.students;
        state.requests = action.payload.requests;
        state.instructors = action.payload.instructors;
        state.loading = false;
      })
      .addCase(fetchEntities.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearAdminState } = adminSlice.actions;
export { fetchEntities };
export default adminSlice.reducer;
