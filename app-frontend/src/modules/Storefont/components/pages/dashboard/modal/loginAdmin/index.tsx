import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../../../../../common/button/button";
import InputValue from "../../../../../../../common/input";
import { setUser } from "../../../features/userLogin";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const isValidAdmin =
      formData.email === "ngovanquoc480@gmail.com" &&
      formData.password === "04082000";
    if (isValidAdmin) {
      // Đăng nhập thành công
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
      alert("Đăng nhập thành công Admin");
      navigate("/admin")
      console.log("Đăng nhập thành công (admin)");
    } else {
        console.log("đăng nhập thất bại")
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
  return (
    <>
      <h2 className="text-[18px] md:text-[20px] font-medium lg:text-[22px]">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <InputValue
          classNameLabel="block text-left font-bold"
          classNameInput="email w-full p-[0.5rem] mb-2.5 border border-solid border-gray-300 rounded-[4px]"
          type="email"
          name="email"
          placeholder="email..."
          value={formData.email}
          onChange={handleChange}
        />
        <InputValue
          classNameLabel="block text-left font-bold"
          classNameInput="password  w-full p-[0.5rem] mb-2.5 border border-solid border-gray-300 rounded-[4px]"
          name="password"
          type="password"
          placeholder="Password..."
          onChange={handleChange}
          value={formData.password}
        />
        <Button type="submit" text="Login" />
      </form>
    </>
  );
}

export default LoginAdmin;
