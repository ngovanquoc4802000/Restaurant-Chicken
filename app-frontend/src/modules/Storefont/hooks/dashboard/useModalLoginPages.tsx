import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../components/pages/features/userLogin";
import {
  clearUserRegister,
  setUserRegister,
} from "../../components/pages/features/userRegister";
import type { LoginCredentials, UsersTs } from "../../mockup/user";
import { createUserLogin, createUsersRegister } from "../../services/users";
import { close } from "../../components/pages/features/modal";

const iniatialRegister: UsersTs = {
  fullname: "",
  email: "",
  phone_number: "",
  address: "",
  password: "",
  create_at: new Date(),
};

export const useModalLoginPages = () => {
  const [value, setValue] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [valueRegister, setValueRegister] = useState<UsersTs>(iniatialRegister);

  const [showForm, setShowForm] = useState(false);
  const handleFormRegister = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createLogin();
  };
  const handleSubmitRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(clearUserRegister());
    updateSave();
    setShowForm(false);
  };
  const updateRegister = async () => {
    const res = await createUsersRegister(valueRegister);
    dispatch(setUserRegister(valueRegister));
    return res;
  };

  const { mutate: updateSave } = useMutation({
    mutationFn: updateRegister,
    onSuccess: (data) => {
      if (!data) return;
      setValueRegister(iniatialRegister);
    },
    onError: (error) => {
      alert("Error dupting create" + error);
    },
  });
  const onChangeRegister = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValueRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const update = async () => {
    const res = await createUserLogin(value);
    return res;
  };
  const {
    isError,
    isPending,
    mutate: createLogin,
  } = useMutation({
    mutationFn: update,
    onSuccess: (data) => {
      if (data.success === true) {
        const { accessToken, data: loginData } = data;
        localStorage.setItem("accesstoken", accessToken);
        localStorage.setItem("userId", loginData.id.toString());
        dispatch(
          setUser({
            id: loginData.id,
            email: loginData.email,
            fullname: loginData.fullname,
            rule: (loginData.rule = "customer"),
            accessToken: accessToken,
            isAuthentication: null
          })
        );
        setValue({ email: "", password: "" });
      }
      
      dispatch(close());
    },
    onError: (error) => {
      console.log("Create login fail:", error);
    },
  });

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    valueRegister,
    onChangeRegister,
    handleFormRegister,
    handleSubmitRegister,
    showForm,
    isPending,
    isError,
    handleSubmit,
    handleOnchange,
    value,
    setValue,
  };
};
