import { useAuth } from "$/auth/hook/useAuth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { close } from "../../components/pages/features/modal";

export const useLoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {login} = useAuth();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async(e: { preventDefault: () => void }) => {
    e.preventDefault();
     const success = await login(formData.email, formData.password);
    if (success) {
      console.log("Login Success (admin)");
      navigate("/admin/category");
      dispatch(close())
    } else {
      console.log("Login defails (admin)")
      navigate("/403-forbidden")
      alert("Login fails Email or Password")
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    formData,
  };
};
