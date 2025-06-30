import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface RegisterUserState {
  id?: number;
  fullname: string;
  phone_number: string;
  email: string;
  address: string;
  password: string;

}

const initialState: RegisterUserState = {
  id: undefined,
  fullname: "",
  phone_number: "",
  email: "",
  address: "",
  password: "",
};

const registerSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    setUserRegister(_state, action: PayloadAction<RegisterUserState>) {
      return {..._state , ...action.payload};
    },
    clearUserRegister() {
      return initialState;
    },
  },
});
export const { setUserRegister, clearUserRegister } = registerSlice.actions;
export default registerSlice.reducer;
