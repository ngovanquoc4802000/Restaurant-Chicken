import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: number; 
  email: string;
  fullname: string;
  rule: string | null; 
}

interface UserLogin {
 success: boolean;
  message: string;
  accessToken: string;
  data: UserData; 
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  loading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    LoginSuccess: (state, action: PayloadAction<UserLogin>) => {
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setInitialAuthStatus: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean; user: UserData | null }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.loading = false;
    },
  },
});
export const { loginStart,LoginSuccess,loginFailure,logout } = authSlice.actions;
export default authSlice.reducer
