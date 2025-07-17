import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/pages/features/modal";
import userLoginReducer from "../components/pages/features/userLogin";
import userRegister from "../components/pages/features/userRegister";
import cartSlice from "../components/pages/features/cartSlice";
import updateLoginReducer from "../components/pages/features/updateLogin";
import authReducer from "$/common/middleware/authApp";

export const store = configureStore({
  reducer: {
    showLogin: modalReducer,
    userLogin: userLoginReducer,
    userRegister: userRegister,
    cart: cartSlice,
    auth: authReducer,
    updateLogin: updateLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
