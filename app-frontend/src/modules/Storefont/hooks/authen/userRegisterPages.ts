import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUsersRegister } from "../../services/users";
import { clearUserRegister, setUserRegister } from "../../components/pages/features/userRegister";
import { useMutation } from "@tanstack/react-query";
import type { UsersTs } from "../../mockup/user";

const iniatialRegister: UsersTs = {
  fullname: "",
  email: "",
  phone_number: "",
  address: "",
  password: "",
  create_at: new Date(),
};

export const useRegister = () => {
  const handleSubmitRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(clearUserRegister());
    updateSave();
  };

  const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValueRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [valueRegister, setValueRegister] = useState<UsersTs>(iniatialRegister);

  const update = async () => {
    const res = await createUsersRegister(valueRegister);
    dispatch(setUserRegister(valueRegister));
    return res;
  };

  const { isPending, mutate: updateSave } = useMutation({
    mutationFn: update,
    onSuccess: (data) => {
      if (!data) return;
      setValueRegister(iniatialRegister);
      navigate("/login");
    },
    onError: (error) => {
      alert("Error dupting create" + error);
    },
  });
  return {
    handleSubmitRegister,
    onChangeRegister,
    navigate,
    dispatch,
    valueRegister,
    setValueRegister,
    isPending,
    updateSave,
  };
};
