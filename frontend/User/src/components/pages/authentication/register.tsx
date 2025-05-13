import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../dashboard/footer";
import Header from "../dashboard/header";
import "./styles.scss";

function Register() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    password: false
  });
  const passwordValidations = {
    length: password.length >= 8,
    uppercaseLowercase: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
    number: /(?=.*\d)/.test(password),
    specialChar: /(?=.*[@#$%^&*!()_+[\]{}|\\:;'",.<>?/-])/.test(password),
  };
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Hàm trả về error message nếu cần
  const getError = (field: string, value: string) => {
    if (!value.trim()) {
      switch (field) {
        case 'firstName': return 'Xin nhập họ.';
        case 'lastName': return 'Xin nhập tên.';
        case 'phone': return 'Xin nhập số điện thoại.';
        case 'email': return 'Xin nhập email.';
        case 'password': return 'Vui lòng nhập mật khẩu của bạn.';
        default: return '';
      }
    }
    return '';
  };
  const errors = {
    firstName: getError('firstName', firstName),
    lastName: getError('lastName', lastName),
    phone: getError('phone', phone),
    email: getError('email', email),
    password: getError('password', password),
  };

  return (
    <div className="register-page">
      <Header />
      <div className="register-container">
        <div className="register-banner">
          <img width={100} src="https://static.kfcvietnam.com.vn/images/web/signin/lg/signin.jpg?v=4B5B0L" alt="KFC Logo" />
        </div>
        <div className="register-form">
          <h2>TẠO TÀI KHOẢN</h2>
          <form>
            <label>Họ của bạn *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => handleBlur('firstName')}
              className={errors.firstName ? 'error-input' : ''}
            />
            {errors.firstName && <div style={{ color: "red" }} className="error-msg">{errors.firstName}</div>}
            {/* Tên */}
            <label>Tên của bạn *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => handleBlur('lastName')}
              className={errors.lastName ? 'error-input' : ''}
            />
            {errors.lastName && <div style={{ color: "red" }} className="error-msg">{errors.lastName}</div>}
            <label>Số điện thoại *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleBlur('phone')}
              className={errors.phone ? 'error-input' : ''}
            />
            {errors.phone && <div style={{ color: "red" }} className="error-msg">{errors.phone}</div>}

            <label>Địa chỉ email của bạn *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <div style={{ color: "red" }} className="error-msg">{errors.email}</div>}


            <label>Mật khẩu *</label>
            <div className="password-wrapper">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                className={errors.password ? 'error-input' : ''}
              />
              {errors.password && <div style={{ color: "red" }} className="error-msg">{errors.password}</div>}
              {showTooltip && (
                <div className="tooltip">
                  <p><span className={passwordValidations.length ? 'valid' : ''}>✔</span> 8 ký tự trở lên</p>
                  <p><span className={passwordValidations.uppercaseLowercase ? 'valid' : ''}>✔</span> Thường & chữ viết hoa</p>
                  <p><span className={passwordValidations.number ? 'valid' : ''}>✔</span> Ít nhất 1 số</p>
                  <p><span className={passwordValidations.specialChar ? 'valid' : ''}>✔</span> 1 ký tự đặc biệt (!@#$%)</p>
                </div>
              )}
            </div>

            <div className="terms">
              <input type="checkbox" id="agree" required />
              <label htmlFor="agree">
                Tôi đã đọc và đồng ý với các <a href="#">Chính Sách Hoạt Động</a> và <a href="#">Chính Sách Bảo Mật</a>.
              </label>
            </div>

            <button className="btn-register" type="submit">Tạo Tài Khoản</button>
          </form>
          <div className="login">
            <label htmlFor="">Bạn đã có tài khoản</label>
            <NavLink to="/login">
              Đăng nhập
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
      <Outlet />
    </div>
  );
}

export default Register;