import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { close } from "../../components/pages/features/modal";
import { setUser } from "../../components/pages/features/userLogin";
import {
  clearUserRegister,
  setUserRegister,
} from "../../components/pages/features/userRegister";
import type { LoginCredentials, UsersTs } from "../../mockup/user";
import { createUserLogin, createUsersRegister } from "../../services/users";

const initialRegister: UsersTs = {
  fullname: "",
  email: "",
  phone_number: "",
  address: "",
  password: "",
  create_at: new Date(),
};

const initialLogin: LoginCredentials = {
  email: "",
  password: ""
}

export const useModalLoginPages = () => {
  const [value, setValue] = useState<LoginCredentials>(initialLogin);

  const [valueRegister, setValueRegister] = useState<UsersTs>(initialRegister);
  
  const [showForm, setShowForm] = useState(false);

  const handleFormRegister = () => {
    if(!showForm) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
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
      setValueRegister(initialRegister);
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
        dispatch(
          setUser({
            id: loginData.id,
            email: loginData.email,
            fullname: loginData.fullname,
            rule: (loginData.rule = "customer"),
            accessToken: accessToken,
          })
        );
        localStorage.setItem("userId", loginData.id.toString());
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
    isError,
    showForm,
    isPending,
    value,
    onChangeRegister,
    handleFormRegister,
    handleSubmitRegister,
    handleSubmit,
    handleOnchange,
    setValue,
  };
};
