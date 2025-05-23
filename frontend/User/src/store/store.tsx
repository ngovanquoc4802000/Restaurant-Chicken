import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/pages/features/modal";
import userLoginReducer from "../components/pages/features/userLogin"
import cartSlice from "../components/pages/features/cartSlice";

export const store = configureStore({
  reducer: {
    loginModal: modalReducer,
    userLogin: userLoginReducer,
    cart: cartSlice
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;