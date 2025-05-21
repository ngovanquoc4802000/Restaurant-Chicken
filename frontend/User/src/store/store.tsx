import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/pages/dashboard/features/modal";
import userReducer from "../components/pages/dashboard/features/user";

export const store = configureStore({
  reducer: {
    loginModal: modalReducer,
    user: userReducer,
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;