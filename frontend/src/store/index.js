import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import clientReducer from "../features/clients/clientSlice";
import serviceReducer from "../features/services/serviceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    services: serviceReducer,
  },
});

export default store;
