import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: number;
  email: string;
  fullname: string;
  accessToken?: string;
  refreshToken?:string;
  rule: string | null;
}

interface UserLoginResponse { 
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
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
    LoginSuccess: (state, action: PayloadAction<UserLoginResponse>) => {
      state.isAuthenticated = true;
      state.user = {
        ...action.payload.data,
        accessToken: action.payload.accessToken, 
        refreshToken: action.payload.refreshToken, 
      };
      state.loading = false;
      state.error = null;
      localStorage.setItem('accessToken', action.payload.accessToken);
     localStorage.setItem('refreshToken', action.payload.refreshToken);
     console.log("✅ accessToken saved:", localStorage.getItem("accessToken"));
     console.log("✅ refreshToken saved:", localStorage.getItem("refreshToken"));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
      localStorage.removeItem('accessToken');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('accessToken');
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

export const { loginStart, LoginSuccess, loginFailure, logout, setInitialAuthStatus } = authSlice.actions;
export default authSlice.reducer;