import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
  },
});
