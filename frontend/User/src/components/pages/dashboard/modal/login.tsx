import { NavLink, useNavigate } from "react-router-dom";
import "./login.scss";
import type { LoggedInUser } from "../../../../mockup/user";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createUserLogin } from "../../../../services/users";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userLogin";
import { open } from "../../features/modal";
import InputValue from "../../common/input";
import Button from "../../common/button";

function ModalLogin() {
  const [value, setValue] = useState<LoggedInUser>({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    createLogin();
  }
  const update = async () => {
    return await createUserLogin(value);
  }
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
        dispatch((open()));
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
      [name]: value
    }))
  }
  return (
    <div className="modal-backdrop">
      {isPending && <p style={{ textAlign: "center", color: "blue" }}>Saving...</p>}
      {isError && <p style={{ textAlign: "center", color: "red" }}>Bạn đã nhập sai Password hoặc Email</p>}
      <div className="modal-box">
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleSubmit} >
          <InputValue text="Email" classNameInput="email" type="email" name="email" placeholder="Nhập email" value={value.email} onChange={handleOnchange} />
          <InputValue classNameInput="password" name="password" type="password" placeholder="Nhập mật khẩu" onChange={handleOnchange} value={value.password} />
          <Button type="submit" text="Đăng nhập" />
        </form>
        <NavLink to="/login/register">
          Đăng kí
        </NavLink>
      </div>
    </div>
  );
}

export default ModalLogin;