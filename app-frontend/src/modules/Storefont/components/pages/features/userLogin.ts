import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface LoggedInUserState {
  id?: number | null;
  email: string | null;
  fullname: string | null;
  rule: 'admin' | 'customer' | null;
  accessToken: string | null;
  isAuthentication: boolean | null;
}
const initialState: LoggedInUserState = {
  id: null,
  email: null,
  fullname: null,
  rule: null,
  accessToken: null,
  isAuthentication: null,
};

const userLoginSlice = createSlice({
  name: "userlogin",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<Omit<LoggedInUserState, "isAuthenticated">>
    ) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.rule = action.payload.rule;
      state.accessToken = action.payload.accessToken;
      state.isAuthentication = action.payload.isAuthentication = true;
    },
    clearUser(state) {
      state.id = null;
      state.email = null;
      state.fullname = null;
      state.rule = null;
      state.accessToken = null;
      state.isAuthentication = null;
    },
  },
});
export const { setUser, clearUser } = userLoginSlice.actions;
export default userLoginSlice.reducer;
