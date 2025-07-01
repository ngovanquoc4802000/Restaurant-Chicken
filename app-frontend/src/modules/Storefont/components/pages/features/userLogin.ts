// features/userLogin.ts (đổi tên file cho rõ ràng hơn)
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LoggedInUserState {
  id: number | null;
  email: string | null;
  fullname: string | null;
  rule: "admin" | "customer" | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: LoggedInUserState = {
  id: null,
  email: null,
  fullname: null,
  rule: null,
  accessToken: null,
  isAuthenticated: false,
};

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Omit<LoggedInUserState, "isAuthenticated">>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.rule = action.payload.rule;
      state.accessToken = action.payload.accessToken ?? null;
      state.isAuthenticated = true;
    },
    refreshTokenSuccess(state, action: PayloadAction<{ newAccessToken: string }>) {
      state.accessToken = action.payload.newAccessToken;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.id = null;
      state.email = null;
      state.fullname = null;
      state.rule = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, refreshTokenSuccess, clearUser } = userLoginSlice.actions;
export default userLoginSlice.reducer;
