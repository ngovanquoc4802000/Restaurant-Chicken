import { NavLink, Outlet } from "react-router-dom";
import { useRegister } from "../../../hooks/authen/userRegisterPages";
import Footer from "../dashboard/footer";
import Header from "../dashboard/header";
import { clearUserRegister } from "../features/userRegister";
import Button from "../../../../../common/button/button";
import InputValue from "../../../../../common/input";

function Register() {
  const { dispatch, value, setValue, updateSave, isPending } = useRegister();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(clearUserRegister());
    updateSave();
  };

  const onChangeRegister = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="register-page gid grid-cols-2 font-sans lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
      {isPending && <p className="text-center text-blue-500">Saving...</p>}
      <Header />
      <div className="register-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-0 md:px-20 lg:px-20">
        <div className="register-banner itemns bg-[#e4002b] text-white mt-14 md:mt-0 lg:mt-0 md:p-8 lg:p-8 flex flex-col justify-center items-center text-center">
          <img
            className="w-[240px] md:w-full mt-7 md:mt-0 lg:mt-0"
            src="https://static.kfcvietnam.com.vn/images/web/signin/lg/signin.jpg?v=4B5B0L"
            alt="KFC Logo"
          />
        </div>
        <div className="register-form p-12 md:p-12 md:mt-3.5 flex-col justify-center">
          <h2 className="text-[1.8rem] mb-4 text-center font-bold">
            Create Register
          </h2>
          <form className="flex flex-col " onSubmit={handleSubmit}>
            <InputValue
              classNameLabel="md:text-[18px]"
              classNameInput={" p-2 border border-gray-500 rounded mt-1 w-full"}
              text="Fullname *"
              type="text"
              name="fullname"
              value={value.fullname}
              onChange={onChangeRegister}
            />
            <InputValue
              classNameLabel="md:text-[18px]"
              text="Telephone *"
              value={value.phone_number}
              type="tel"
              name="phone_number"
              onChange={onChangeRegister}
              classNameInput={"w-full p-2 border border-gray-500 rounded mt-1"}
            />
            <InputValue
              classNameLabel="md:text-[18px]"
              classNameInput={"w-full p-2 border border-gray-500 rounded mt-1"}
              type="Email *"
              name="email"
              value={value.email}
              text="Email của bạn *"
              onChange={onChangeRegister}
            />
            <InputValue
              classNameLabel="md:text-[18px]"
              text="Address *"
              type="address"
              name="address"
              value={value.address}
              onChange={onChangeRegister}
              classNameInput={"w-full p-2 border border-gray-500 rounded mt-1"}
            />
            <InputValue
              classNameLabel="md:text-[18px]"
              text="Password *"
              type="password"
              name="password"
              value={value.password}
              onChange={onChangeRegister}
              classNameInput="w-full p-2 border border-gray-500 rounded mt-1"
            />
            <div className="terms mt-6 flex ">
              <input
                className="mr-2 mt-1"
                type="checkbox"
                id="agree"
                required
              />
              <label htmlFor="agree" className="text-[18px]">
                I have read and agree to the <a href="#">Operational policy</a>{" "}
                <a href="#">Privacy policy</a>.
              </label>
            </div>
            <Button
              className="btn-register mt-8 bg-[#e4002b] text-[16px] md:text-[18px] text-white p-3 border-none rounded-3xl font-bold cursor-pointer text-[1.1rem]"
              text=" Tạo Tài Khoản"
              type="submit"
            />
          </form>
          <div className="login text-center p-3">
            <label htmlFor="" className="text-[16px] md:text-[18px]">
             You already have an account
            </label>
            <NavLink
              className="font-bold  text-[16px] md:text-[18px] text-[#007bff] font-bold md:ml-2"
              to="/login"
            >
              Login
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
