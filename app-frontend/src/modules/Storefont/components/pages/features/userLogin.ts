import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface LoggedInUserState {
  id?: number;
  email: string;
  password: string;
}
const initialState: LoggedInUserState = {
  id: undefined,
  email: "",
  password: ""
};

const userLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
     setUser(_state, action: PayloadAction<LoggedInUserState>) {
      return action.payload;
     },
     clearUser() {
        return initialState;
     }
  }
})
export const { setUser,clearUser } = userLoginSlice.actions;
export default userLoginSlice.reducer;