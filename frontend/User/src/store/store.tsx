import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/pages/features/modal";
import userLoginReducer from "../components/pages/features/userLogin"

export const store = configureStore({
  reducer: {
    loginModal: modalReducer,
    userLogin: userLoginReducer,
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;