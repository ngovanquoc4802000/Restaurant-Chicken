import { useState } from "react";
import type { LoggedInUser } from "../../mockup/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserLogin } from "../../services/users";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "../../components/pages/features/userLogin";
import { open } from "../../components/pages/features/modal";

export const useModalLoginPages = () => {
  const [value, setValue] = useState<LoggedInUser>({
    email: "",
    password: "",
  });
   const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createLogin();
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const update = async () => {
    return await createUserLogin(value);
  };
  const { isPending, isError, mutate: createLogin } = useMutation({
    mutationFn: update,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setUser({
          id: data.data.id,
          email: data.data.email,
          password: data.data.password
        }))
        setValue({ email: "", password: "" });
        navigate("/home");
      } else {
        dispatch(open());
      }

    },
    onError: (error) => {
      console.log("Error during create:", error);
      dispatch((open()));
    }
  });
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return { handleSubmit,handleOnchange ,createLogin, isError,isPending,dispatch,value,setValue };
};
