import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUsersRegister } from "../../services/users";
import { setUserRegister } from "../../components/pages/features/userRegister";
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
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [value, setValue] = useState<UsersTs>(iniatialRegister);
  
  const update = async () => {
    const res = await createUsersRegister(value);
    dispatch(setUserRegister(value));
    return res;
  };
  
  const { isPending, mutate: updateSave } = useMutation({
    mutationFn: update,
    onSuccess: (data) => {
      if (!data) return;
      setValue(iniatialRegister);
      navigate("/login");
    },
    onError: (error) => {
      alert("Error dupting create" + error);
    },
  });
  return { navigate, dispatch, value, setValue, isPending, updateSave };
};
