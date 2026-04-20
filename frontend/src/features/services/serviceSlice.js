import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getServices, 
  createService, 
  assignService 
} from "../clients/services/client.service";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getServices();
      return data.services;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch services");
    }
  }
);

export const addService = createAsyncThunk(
  "services/addService",
  async (serviceData, { rejectWithValue }) => {
    try {
      const data = await createService(serviceData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add service");
    }
  }
);

export const assignServiceToClient = createAsyncThunk(
  "services/assignService",
  async (assignmentData, { rejectWithValue }) => {
    try {
      const data = await assignService(assignmentData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to assign service");
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearServiceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Service
      .addCase(addService.pending, (state) => {
        state.loading = true;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearServiceError } = serviceSlice.actions;
export default serviceSlice.reducer;
