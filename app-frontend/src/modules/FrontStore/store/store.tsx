import modalReducer from "../components/pages/features/modal";
import userLoginReducer from "../components/pages/features/userLogin";
import userRegister from "../components/pages/features/userRegister";
import cartSlice from "../components/pages/features/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    loginModal: modalReducer,
    userLogin: userLoginReducer,
    userRegister: userRegister,
    cart: cartSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
