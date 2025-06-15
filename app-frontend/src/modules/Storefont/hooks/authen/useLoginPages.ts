import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { open } from "../../components/pages/features/modal";
import type { LoginCredentials } from "../../mockup/user";
import { createUserLogin } from "../../services/users";
import type { RootState } from "../../store/store";
import { setUser } from "../../components/pages/features/userLogin";

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [value, setValue] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const isOpen = useSelector((state: RootState) => state.showLogin);

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
        const { accessToken, data: userData } = data;
        localStorage.setItem("accessToken",accessToken);
        dispatch(
          setUser({
            id: userData.id,
            email: userData.email,
            fullname: userData.fullname,
            rule: (userData.rule = "customer"),
            accessToken: accessToken,
            isAuthentication: true
          })
        );
        if (userData.rule === "customer") {
          navigate("/home");
          setValue({ email: "", password: "" });
        }
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
  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return {
    handleOnchange,
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
    isPaused,
  };
};
