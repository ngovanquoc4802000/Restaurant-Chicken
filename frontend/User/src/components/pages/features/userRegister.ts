import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UsersTs } from "../../../mockup/user";

const initialState: UsersTs = {
  fullname: "",
  email: "",
  password: "",
  phone_number: "",
  address: "",
  create_at: new Date(), // tốt hơn là ISO string
}

const userRegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setUserRegister(state, action: PayloadAction<UsersTs>) {
      return action.payload;
    }
  }
})
export const { setUserRegister } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;