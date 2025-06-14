import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { open } from "../../components/pages/features/modal";
import { setUser } from "../../components/pages/features/userLogin";
import type { LoggedInUser, UsersTs } from "../../mockup/user";
import { createUserLogin, createUsersRegister } from "../../services/users";
import { clearUserRegister, setUserRegister } from "../../components/pages/features/userRegister";

const iniatialRegister: UsersTs = {
  fullname: "",
  email: "",
  phone_number: "",
  address: "",
  password: "",
  create_at: new Date(),
};

export const useModalLoginPages = () => {
  const [value, setValue] = useState<LoggedInUser>({
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
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const update = async () => {
    return await createUserLogin(value);
  };
  const {
    isError,
    isPending,
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
        dispatch(open());
      }
    },
    onError: (error) => {
      console.log("Error during create:", error);
      dispatch(open());
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
    createLogin,
    dispatch,
    value,
    setValue,
  };
};
