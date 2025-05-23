import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { createUserLogin } from "../../../services/users";
import { useDispatch, useSelector } from "react-redux";
import { close, open } from "../features/modal";
import InputValue from "../common/input";
import Footer from "../dashboard/footer";
import Header from "../dashboard/header";
import '../dashboard/styles.scss';
import '../../../assets/Screenshot 2025-05-08 164110.png';
import Button from "../common/button";
import type { LoggedInUser } from "../../../mockup/user";
import { setUser } from "../features/userLogin";
import type { RootState } from "../../../store/store";

function Login() {
  const [value, setValue] = useState<LoggedInUser>({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const isOpen = useSelector((state: RootState) => state.loginModal);

  const userId = useSelector((state: RootState) => state.userLogin.id);
  console.log("USER_ID:", userId);

  const dispatch = useDispatch();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createLogin();
  }

  const update = async () => {
    return await createUserLogin(value)
  }

  const { isPending, isPaused, mutate: createLogin } = useMutation({
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
        setErrorMessage(data.message || data.data.email || "Đăng nhập không thành công.");
        dispatch((open()))
      }

    },
    onError: (error) => {
      console.log("Error during create:", error);
      setErrorMessage(error?.message || "Đăng ký thất bại. Vui lòng thử lại.");
      dispatch((open()))
    }
  })

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <>
      {isPending && <p style={{ textAlign: "center", color: "blue" }}>Saving...</p>}
      <div className="login-page">
        {isPaused && <p style={{ textAlign: "center", color: "blue" }}>Paused...</p>}
        <Header />
        {isOpen && (
          <div className="fixed inset-0  flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6">
              <h2 className="text-xl font-bold text-red-600 mb-4 text-center">
                {errorMessage}
              </h2>
              <p className="text-gray-700 text-center mb-6">
                Đăng nhập thất bại , vui lòng nhập lại !
              </p>
              <div className="flex justify-center">
                <Button text="Đóng" onClick={() => dispatch(close())} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition" />
              </div>
            </div>
          </div>
        )}

        <div className="login-container grid font-sans py-0  md:px-24 lg:md-24 grid-cols-1 min-h-screen md:grid-cols-2">
          <div className="login-banner bg-[#e4002b] items-center text-white p-6 flex flex-col justify-center text-center ">
            <img width={100} className="w-[240px]  mt-15 md:mt-0 lg:mt-0   md:w-full lg:w-full" src="https://static.kfcvietnam.com.vn/images/web/signin/lg/signin.jpg?v=4B5B0L" alt="KFC Logo" />
          </div>
          <div className="login-form p-9 flex flex-col justify-center">
            <h2 className="font-bold text-center  text-[25px] md:text-[1.8rem] mb-4">ĐĂNG NHẬP</h2>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <InputValue classNameLabel="mb-4 text-[14px] md:text-[1.6rem] " text="Địa chỉ email của bạn *" name="email" type="email" value={value.email} onChange={handleOnchange} classNameInput="w-full p-2 mt-1 rounded-md border border-gray-500" />
              <InputValue text="Mật khẩu *" type="password" name="password" value={value.password} onChange={handleOnchange} classNameInput="w-full p-2 mt-1 text-[14px] md:text-[1.6rem] rounded-md border border-gray-500" />
              <a className="text-[14px] md:text[0.9rem] text-[#007bff] no-underline mb-4" href="#">Bạn quên mật khẩu?</a>
              <button type="submit" className="btn-login bg-[#28a745] text-white p-3 border-none rounded-3xl cursor-pointer mb-4">Đăng nhập</button>
            </form>

            <div className="divider text-center my-4 mx-0">Hoặc tiếp tục với</div>
            <Button className="bg-black p-3 border-none rounded-3xl text-white mb-3 cursor-pointer w-full btn-apple" text="Đăng nhập bằng Apple" />
            <Button className="bg-[#db4437] p-3 border-none rounded-3xl text-white mb-3 cursor-pointer w-full btn-google" text="Đăng nhập bằng Google" />
            <p className="text-center mt-4">Bạn chưa có tài khoản?
              <NavLink className="text-[#007bff] font-bold" to="register">Đăng ký</NavLink>
            </p>
          </div>
        </div>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Login;