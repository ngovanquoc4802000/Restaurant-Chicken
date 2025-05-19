import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { createUsersRegister } from "../../../services/users";
import type { UsersTs } from "../../../mockup/user";
import Footer from "../dashboard/footer";
import Header from "../dashboard/header";
import InputValue from "../dashboard/input";
import Button from "../button";

function Register() {

  const navigate = useNavigate();

  const [showTooltip, setShowTooltip] = useState(false);

  const [value, setValue] = useState<UsersTs>({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    create_at: new Date(),
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    address: false,
    password: false
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateSave();
  }

  const update = async () => {
    return await createUsersRegister(value);
  }

  const { isPending, mutate: updateSave } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      alert("Thành công");
      setValue({
        fullname: "",
        email: "",
        phone_number: "",
        address: "",
        password: "",
        create_at: new Date(),
      });
      navigate("/login");
    },
    onError: (error) => {
      alert("Error dupting create" + error);
    }
  })

  const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValue((prev) => ({
      ...prev, [name]: value
    }))
  }


  const passwordValidations = {
    length: value.password.length >= 8,
    uppercaseLowercase: /(?=.*[a-z])(?=.*[A-Z])/.test(value.password),
    number: /(?=.*\d)/.test(value.password),
    specialChar: /(?=.*[@#$%^&*!()_+[\]{}|\\:;'",.<>?/-])/.test(value.password),
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getError = (field: string, value: string) => {
    if (!value.trim()) {
      switch (field) {
        case 'lastName': return 'Xin nhập họ và tên';
        case 'phone': return 'Xin nhập số điện thoại.';
        case 'email': return 'Xin nhập email.';
        case 'address': return 'Xin nhập address.';
        case 'password': return 'Vui lòng nhập mật khẩu của bạn.';
        default: return '';
      }
    }
    return '';
  };
  const errors = {
    lastName: getError('lastName', value.fullname),
    phone: getError('phone', value.phone_number),
    email: getError('email', value.email),
    address: getError('address', value.address),
    password: getError('password', value.password),
  };

  return (
    <div className="register-page gid grid-cols-1 font-sans lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
      {isPending && <p style={{ textAlign: "center", color: "blue" }}>Saving...</p>}
      <Header />
      <div className="register-container grid grid-cols-2 py-0 px-20">
        <div className="register-banner bg-[#e4002b] text-white p-8 flex flex-col justify-center items-center text-center">
          <img width={100} className="w-full" src="https://static.kfcvietnam.com.vn/images/web/signin/lg/signin.jpg?v=4B5B0L" alt="KFC Logo" />
        </div>
        <div className="register-form p-12 flex-col justify-center">
          <h2 className="text-[1.8rem] mb-4">TẠO TÀI KHOẢN</h2>
          <form className="flex flex-col " onSubmit={handleSubmit}>

            <InputValue classNameInput={errors.lastName ? 'error-input p-2 border border-gray-500 rounded mt-1 w-full' : ''} onBlur={() => handleBlur("lastName w-full")} text="Họ và tên của bạn *" type="text" name="fullname" value={value.fullname} onChange={onChangeRegister} />

            {errors.lastName && <div style={{ color: "red" }} className="error-msg">{errors.lastName}</div>}

            <InputValue onBlur={() => handleBlur("phone")} text="Số điện thoại" value={value.phone_number} type="tel" name="phone_number" onChange={onChangeRegister} classNameInput={errors.phone ? 'error-input p-2 border border-gray-500 rounded mt-1' : ''} />

            {errors.phone && <div style={{ color: "red" }} className="error-msg">{errors.phone}</div>}

            <InputValue classNameInput={errors.email ? 'error-input p-2 border border-gray-500 rounded mt-1' : ''} type="email" name="email" value={value.email} text="Email của bạn *" onBlur={() => handleBlur("email")} onChange={onChangeRegister} />

            {errors.email && <div style={{ color: "red" }} className="error-msg">{errors.email}</div>}

            <InputValue text="Địa chỉ của bạn *" type="address" name="address" value={value.address} onChange={onChangeRegister} onBlur={() => handleBlur("address")} classNameInput={errors.email ? 'error-input p-2 border border-gray-500 rounded mt-1' : ''} />

            {errors.email && <div style={{ color: "red" }} className="error-msg">{errors.email}</div>}

            <label>Mật khẩu *</label>
            <div className="password-wrapper relative">
              <input type="password" name="password" value={value.password} onChange={onChangeRegister} onBlur={() => handleBlur('password')} className={errors.password ? 'error-input w-full p-2 border border-gray-500 rounded mt-1' : ''} />

              {errors.password && <div style={{ color: "red" }} className="error-msg">{errors.password}</div>}

              {showTooltip && (
                <div className="tooltip absolute top-[105%] left-0 bg-black text-white p-4 rounded-md min-w-max text-[0.85rem] z-[1]">
                  <p className="my-1 mx-0"><span className={passwordValidations.length ? 'valid text-[#00ff00]' : ''}>✔</span> 8 ký tự trở lên</p>
                  <p className="my-1 mx-0"><span className={passwordValidations.uppercaseLowercase ? 'valid text-[#00ff00]' : ''}>✔</span> Thường & chữ viết hoa</p>
                  <p className="my-1 mx-0"><span className={passwordValidations.number ? 'valid text-[#00ff00]' : ''}>✔</span> Ít nhất 1 số</p>
                  <p className="my-1 mx-0"><span className={passwordValidations.specialChar ? 'valid text-[#00ff00]' : ''}>✔</span> 1 ký tự đặc biệt (!@#$%)</p>
                </div>
              )}
            </div>

            <div className="terms mt-6 flex ">
              <input className="mr-2 mt-1" type="checkbox" id="agree" required />
              <label htmlFor="agree">
                Tôi đã đọc và đồng ý với các <a href="#">Chính Sách Hoạt Động</a> và <a href="#">Chính Sách Bảo Mật</a>.
              </label>
            </div>
            <Button className="btn-register mt-8 bg-[#e4002b] text-white p-3 border-none rounded-3xl font-bold cursor-pointer text-[1.1rem]" text=" Tạo Tài Khoản" type="submit" />
          </form>
          <div className="login text-center p-3">
            <label htmlFor="">Bạn đã có tài khoản</label>
            <NavLink className="font-bold text-black" to="/login">
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