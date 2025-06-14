import { NavLink } from "react-router-dom";
import Button from "../../../../../../common/button/button";
import InputValue from "../../../../../../common/input";
import { useModalLoginPages } from "../../../../hooks/dashboard/useModalLoginPages";
import "./login.scss";

function ModalLogin() {
  const {
    handleSubmit,
    isError,
    isPending,
    value,
    handleOnchange,
    showForm,
    handleFormRegister,
    handleSubmitRegister,
    onChangeRegister,
    valueRegister,
  } = useModalLoginPages();

  return (
    <div className="modal-backdrop fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/60 flex justify-center items-center z-[9999]">
      {isPending && <p className="text-center text-blue-500">Saving...</p>}

      <div className="modal-box bg-white p-6 w-[90%] max-w-[400px] rounded-[8px] text-center">
        {showForm ? (
          <div className="register-form p-12 md:p-12 md:mt-3.5 flex-col justify-center">
            <h2 className="text-[1.8rem] mb-4 text-center font-bold">
              Create Register
            </h2>
            {
            <form className="flex flex-col " onSubmit={handleSubmitRegister}>
              <InputValue
                classNameLabel="md:text-[18px]"
                classNameInput={
                  " p-2 border border-gray-500 rounded mt-1 w-full"
                }
                text="Fullname *"
                type="text"
                name="fullname"
                value={valueRegister.fullname}
                onChange={onChangeRegister}
              />
              <InputValue
                classNameLabel="md:text-[18px]"
                text="Telephone *"
                value={valueRegister.phone_number}
                type="tel"
                name="phone_number"
                onChange={onChangeRegister}
                classNameInput={
                  "w-full p-2 border border-gray-500 rounded mt-1"
                }
              />
              <InputValue
                classNameLabel="md:text-[18px]"
                classNameInput={
                  "w-full p-2 border border-gray-500 rounded mt-1"
                }
                type="Email *"
                name="email"
                value={valueRegister.email}
                text="Email của bạn *"
                onChange={onChangeRegister}
              />
              <InputValue
                classNameLabel="md:text-[18px]"
                text="Address *"
                type="address"
                name="address"
                value={valueRegister.address}
                onChange={onChangeRegister}
                classNameInput={
                  "w-full p-2 border border-gray-500 rounded mt-1"
                }
              />
              <InputValue
                classNameLabel="md:text-[18px]"
                text="Password *"
                type="password"
                name="password"
                value={valueRegister.password}
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
                  I have read and agree to the{" "}
                  <a href="#">Operational policy</a>{" "}
                  <a href="#">Privacy policy</a>.
                </label>
              </div>
              <Button
                className="btn-register mt-8 bg-[#e4002b] text-[16px] md:text-[18px] text-white p-3 border-none rounded-3xl font-bold cursor-pointer text-[1.1rem]"
                text="Create Register"
                type="submit"
              />
            </form>
            }
            <div className="login text-center p-3">
              <label htmlFor="" className="text-[16px] md:text-[18px]">
                You already have an account
              </label>
              <NavLink
                className="font-bold  text-[16px] md:text-[18px] text-[#007bff] font-bold md:ml-2" to={""}              >
                Login
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            {isError && (
              <p className="text-center text-red-500">
                You have entered the wrong Password or Email
              </p>
            )}
            <h2 className="text-[18px] md:text-[20px] font-medium lg:text-[22px]">
              Login
            </h2>

            <form onSubmit={handleSubmit}>
              <InputValue
                classNameLabel="block text-left font-bold"
                classNameInput="email w-full p-[0.5rem] mb-2.5 border border-solid border-gray-300 rounded-[4px]"
                type="email"
                name="email"
                placeholder="Email..."
                value={value.email}
                onChange={handleOnchange}
              />
              <InputValue
                classNameLabel="block text-left font-bold"
                classNameInput="password  w-full p-[0.5rem] mb-2.5 border border-solid border-gray-300 rounded-[4px]"
                name="password"
                type="password"
                placeholder="Password..."
                onChange={handleOnchange}
                value={value.password}
              />
              <Button type="submit" text="Login" />
            </form>
          </>
        )}
        <NavLink
          onClick={handleFormRegister}
          className="text-blue-500 font-bold underline"
          to={""}
        >
          Register
        </NavLink>
      </div>
    </div>
  );
}

export default ModalLogin;
