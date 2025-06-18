import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../components/pages/features/userLogin";

export const useLoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const isValidAdmin =
      formData.email === "ngovanquoc480@gmail.com" &&
      formData.password === "04082000";
    if (isValidAdmin) {
      dispatch(
        setUser({
          id: 1,
          email: formData.email,
          fullname: "Admin",
          rule: "admin",
          accessToken: "admin-fake-token",
          isAuthentication: true,
        })
      );
      alert("Login Success Admin");
      navigate("/admin");
      console.log("Login Success (admin)");
    } else {
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
