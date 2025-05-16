import { NavLink, Outlet } from "react-router-dom";
import Footer from "../dashboard/footer";
import Header from "../dashboard/header";
import '../../../assets/Screenshot 2025-05-08 164110.png';
import '../dashboard/styles.scss';

function Login() {
  return (
    <div className="login-page">
      <Header />
      <div className="login-container grid font-sans py-0 px-24 grid-cols-2 min-h-screen md:grid-cols-1">
        <div className="login-banner bg-[#e4002b] text-white p-6 flex flex-col justify-center items-end text-center ">
          <img width={100} className="w-full" src="https://static.kfcvietnam.com.vn/images/web/signin/lg/signin.jpg?v=4B5B0L" alt="KFC Logo" />
        </div>
        <div className="login-form p-9 flex flex-col justify-center">
          <h2 className="text-[1.8rem] mb-4">ĐĂNG NHẬP</h2>
          <form className="flex flex-col">
            <label className="mb-4">
              Địa chỉ email của bạn *
              <input className="w-full p-2 mt-1 rounded-md border border-gray-500
              " type="email" required />
            </label>
            <label>
              Mật khẩu *
              <input className="w-full p-2 mt-1 rounded-md border border-gray-500
              " type="password" required />
            </label>
            <a className="text-[0.9rem] text-[#007bff] no-underline mb-4" href="#">Bạn quên mật khẩu?</a>
            <button type="submit" className="btn-login bg-[#28a745] text-white p-3 border-none rounded-3xl cursor-pointer mb-4">Đăng nhập</button>
          </form>

          <div className="divider text-center my-4 mx-0">Hoặc tiếp tục với</div>
          <button className="bg-black p-3 border-none rounded-3xl text-white mb-3 cursor-pointer w-full btn-apple">Đăng nhập bằng Apple</button>
          <button className="bg-[#db4437] p-3 border-none rounded-3xl text-white mb-3 cursor-pointer w-full btn-google">Đăng nhập bằng Google</button>
          <p className="text-center mt-4">Bạn chưa có tài khoản?
            <NavLink className="text-[#007bff] font-bold" to="register">Đăng ký</NavLink>
          </p>
        </div>
      </div>
      <Outlet/>
      <Footer />
    </div>
  );
}

export default Login;