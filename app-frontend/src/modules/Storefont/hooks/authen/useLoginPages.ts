import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { open } from "../../components/pages/features/modal";
import { setUpdateLogin } from "../../components/pages/features/updateLogin";
import { setUser } from "../../components/pages/features/userLogin";
import type { LoginCredentials } from "../../mockup/user";
import { createUserLogin } from "../../services/users";
import type { RootState } from "../../store/store";

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [value, setValue] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createLogin();
  };

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
        localStorage.setItem("userId", userData.id.toString());
        dispatch(
          setUser({
            id: userData.id,
            email: userData.email,
            fullname: userData.fullname,
            rule: userData.rule,
            accessToken: accessToken,
          })
        );
        dispatch(
          setUpdateLogin({
            fullname: data.data.fullname,
            email: data.data.email,
            phone_number: "",
          })
        );
        navigate("/home");

        setValue({ email: "", password: "" });
        localStorage.getItem("userId");

        localStorage.getItem("user_order_history");
      } else {
        setErrorMessage(data.message || data.data.email || "Login No fails.");
        dispatch(open());
      }
    },
    onError: (error) => {
      console.log("Error during create:", error);
      setErrorMessage(error?.message || "Register No fails. Please inter.");
      dispatch(open());
    },
  });
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return {
    handleSubmit,
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
