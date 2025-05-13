import { NavLink, Outlet } from "react-router-dom";
import Footer from "../dashboard/footer";
import Header from "../dashboard/header";
import '../../../assets/Screenshot 2025-05-08 164110.png';
import '../dashboard/styles.scss';
import "./styles.scss";

function Login() {
  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <div className="login-banner">
          <img width={100} src="https://static.kfcvietnam.com.vn/images/web/signin/lg/signin.jpg?v=4B5B0L" alt="KFC Logo" />
        </div>
        <div className="login-form">
          <h2>ĐĂNG NHẬP</h2>
          <form>
            <label>
              Địa chỉ email của bạn *
              <input type="email" required />
            </label>
            <label>
              Mật khẩu *
              <input type="password" required />
            </label>
            <a href="#">Bạn quên mật khẩu?</a>
            <button type="submit" className="btn-login">Đăng nhập</button>
          </form>

          <div className="divider">Hoặc tiếp tục với</div>
          <button className="btn-apple">Đăng nhập bằng Apple</button>
          <button className="btn-google">Đăng nhập bằng Google</button>
          <p>Bạn chưa có tài khoản?
            <NavLink to="register">Đăng ký</NavLink>
          </p>
        </div>
      </div>
      <Outlet/>
      <Footer />
    </div>
  );
}

export default Login;