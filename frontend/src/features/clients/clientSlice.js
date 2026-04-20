import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getClients, 
  createClients, 
  editClients 
} from "./services/client.service";

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getClients();
      return data.clients;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch clients");
    }
  }
);

export const addClient = createAsyncThunk(
  "clients/addClient",
  async (clientData, { rejectWithValue }) => {
    try {
      const data = await createClients(clientData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add client");
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const result = await editClients(id, data);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update client");
    }
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearClientError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Clients
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Client
      .addCase(addClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update list or wait for re-fetch
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearClientError } = clientSlice.actions;
export default clientSlice.reducer;
