import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/pages/dashboard/features/modal";

export const store = configureStore({
  reducer: {
    loginModal: modalReducer
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;