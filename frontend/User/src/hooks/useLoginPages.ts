import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { useState } from "react";
import { createUserLogin } from "../services/users";
import type { LoggedInUser } from "../mockup/user";
import { useMutation } from "@tanstack/react-query";
import { open } from "../components/pages/features/modal";
import { setUser } from "../components/pages/features/userLogin";

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [value, setValue] = useState<LoggedInUser>({
    email: "",
    password: "",
  });

  const isOpen = useSelector((state: RootState) => state.loginModal);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const update = async () => {
    return await createUserLogin(value);
  };
 const {
    isPending,
    isPaused,
    mutate: createLogin,
  } = useMutation({
    mutationFn: update,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(
          setUser({
            id: data.data.id,
            email: data.data.email,
            password: data.data.password,
          })
        );
        setValue({ email: "", password: "" });
        navigate("/home");
      } else {
        setErrorMessage(
          data.message || data.data.email || "Đăng nhập không thành công."
        );
        dispatch(open());
      }
    },
    onError: (error) => {
      console.log("Error during create:", error);
      setErrorMessage(error?.message || "Đăng ký thất bại. Vui lòng thử lại.");
      dispatch(open());
    },
  });
  return {
    navigate,
    isOpen,
    dispatch,
    errorMessage,
    setErrorMessage,
    value,
    setValue,
    update,
    createLogin,
    isPending,
    isPaused
  };
};
