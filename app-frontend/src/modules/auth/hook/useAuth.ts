import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Storefont/store/store";
import {
  loginFailure,
  loginStart,
  LoginSuccess,
  logout,
} from "../../../common/middleware/authApp";
import { createUserLogin } from "../../Storefont/services/users";
import { Request } from "../../Storefont/utils/http";
import type { UserLoginResponse } from "../../Storefont/mockup/user";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const performLogin = async (email: string, password: string) => {
    dispatch(loginStart());
    try {
      const data = await createUserLogin({ email, password });
      console.log(data);
      if (data.success) {
        dispatch(LoginSuccess(data));
        console.log("true");
        return true;
      } else {
        dispatch(loginFailure(data.message || "Login failed"));
        console.log("false");
        return false;
      }
    } catch (error: unknown) {
      console.log("error No Get Emai and Password in rudex" + error);
    }
  };
  const checkAndRefreshToken = async () => {
    dispatch(loginStart());
    try {
      const response = await Request.post<UserLoginResponse>(
        "user/refresh-token"
      );
      if (response.data.success) {
        dispatch(LoginSuccess(response.data));
        console.log("true");
        return true;
      } else {
        alert("Token expired. Please log in again.");
        return false;
      }
    } catch (error) {
      console.log(error);
      dispatch(
        loginFailure(
          "Failed to refresh token. Please check your network or try again."
        )
      );
      return false;
    }
  };
  return {
    isAuthenticated,
    user,
    loading,
    error,
    login: performLogin,
    logout: () => {
      Request.post("user/logout", {}, { withCredentials: true }) 
        .then(() => {
          console.log("Server session cleared.");
        })
        .catch((err) => {
          console.error("Error clearing server session:", err);
        });
      dispatch(logout());
    },
    initializeAuth: checkAndRefreshToken,
  };
};
