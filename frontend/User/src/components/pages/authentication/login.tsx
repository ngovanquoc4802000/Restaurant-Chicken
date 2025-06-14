import { NavLink, Outlet } from "react-router-dom";
import { useLogin } from "../../../hooks/authen/useLoginPages";
import { close } from "../features/modal";
import Button from "../common/button";
import InputValue from "../common/input";
import Footer from "../dashboard/footer";
import Header from "../dashboard/header";
import "../../../assets/Screenshot 2025-05-08 164110.png";
import "../dashboard/styles.scss";

function Login() {
  const { isOpen, dispatch, errorMessage, value, setValue, createLogin,  isPaused,  isPending} = useLogin();
  
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createLogin();
  };

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {isPending && (
        <p className="text-center text-blue-500">Saving...</p>
      )}
      <div className="login-page">
        {isPaused && (
          <p className="text-center text-blue-500">Paused...</p>
        )}
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
                <Button text="Đóng" onClick={() => dispatch(close())} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"/>
              </div>
            </div>
          </div>
        )}

        <div className="login-container grid font-sans py-0  md:px-24 lg:md-24 grid-cols-1 min-h-screen md:grid-cols-2">
          <div className="login-banner bg-[#e4002b] items-center text-white p-6 flex flex-col justify-center text-center ">
            <img  width={100}  className="w-[240px]  mt-15 md:mt-0 lg:mt-0   md:w-full lg:w-full"  src="https://static.kfcvietnam.com.vn/images/web/signin/lg/signin.jpg?v=4B5B0L"  alt="KFC Logo"
            />
          </div>
          <div className="login-form p-9 flex flex-col justify-center">
            <h2 className="font-bold text-center  text-[25px] md:text-[1.8rem] mb-4">
              ĐĂNG NHẬP
            </h2>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <InputValue classNameLabel="mb-4 text-[14px] md:text-[18px] "  text="Địa chỉ email của bạn *"  name="email"  type="email"  value={value.email}  onChange={handleOnchange}  classNameInput="w-full p-2 mt-1 rounded-md border border-gray-500"/>
              <InputValue classNameLabel="text-[14px] md:text-[18px]"   text="Mật khẩu *"  type="password"  name="password"  value={value.password}  onChange={handleOnchange}  classNameInput="w-full p-2 mt-1 text-[14px] md:text-[1.6rem] rounded-md border border-gray-500"/>
              <a
                className="text-[14px] md:text[20px] text-[#007bff] no-underline mb-4"
                target="_blank"
                href="#"
              >
                Bạn quên mật khẩu?
              </a>
              <Button type="submit" text="Đăng nhập" className="btn-login bg-[#28a745] text-white p-3 border-none rounded-3xl md:text-[18px] cursor-pointer mb-4"/>
            </form>

            <div className="divider text-center my-4 mx-0 md:text-18px">
              Hoặc tiếp tục với
            </div>
            <Button className="bg-black p-3 border-none rounded-3xl md:text-[18px] text-white mb-3 cursor-pointer w-full btn-apple"  text="Đăng nhập bằng Apple"/>
            <Button className="bg-[#db4437] p-3 border-none rounded-3xl md:text-[18px] text-white mb-3 cursor-pointer w-full btn-google"  text="Đăng nhập bằng Google"/>
            <p className="text-center mt-4 md:text-[18px]">
              Bạn chưa có tài khoản?
              <NavLink
                className="text-[#007bff] font-bold md:text-[18px] ml-2"
                to="register"
              >
                Đăng ký
              </NavLink>
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
