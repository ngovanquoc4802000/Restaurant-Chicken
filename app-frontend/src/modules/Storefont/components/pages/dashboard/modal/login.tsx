import Button from "$/common/button/button";
import InputValue from "$/common/input";
import { useModalLoginPages } from "$/modules/Storefont/hooks/dashboard/useModalLoginPages";
import { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

interface OnCloseTs {
  isModal?: boolean;
  setIsModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalLogin({ isModal, setIsModal }: OnCloseTs) {
  const {
    isError,
    isPending,
    value,
    valueRegister,
    showForm,
    handleSubmit,
    handleOnchange,
    handleFormRegister,
    handleSubmitRegister,
    onChangeRegister,
    setShowForm,
  } = useModalLoginPages();
  const backdropRef = useRef<HTMLDivElement>(null);
  const handleOnclose = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      if (setIsModal) {
        setIsModal(false);
      }
    }
  };
  const isValidCheckRegister = valueRegister.password.trim() === "";
  const isValidCheckLogin = value.password.trim() === "";
  return (
    <div
      ref={backdropRef}
      className="modal-backdrop fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/60 flex justify-center items-center z-[9999]"
    >
      <div className="relative ml-[1rem] bg-white rounded-xl lg:mb-0  shadow-xl">
        <button
          onClick={handleOnclose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <AiOutlineClose size={20} />
        </button>
        {isPending && <p className="text-center text-blue-500">Saving...</p>}
        <div className="modal-box w-[500px] md:mt-[-4px] md:p-[2rem] md:pb-[4rem] lg:mt-[0px] lg:p-[2rem] bg-white p-6 max-w-[400px] rounded-[8px] text-center">
          {showForm && (
            <div className="register-form md:h-[70vh]  lg:p-0 p-0 md:p-0 md:mt-3.5 flex-col justify-center">
              <h2 className="text-[20px] text-center md:mb-[0px] xl:mb-[0px] lg:mb-[0px] font-bold">
                Create Register
              </h2>
              <form className="flex flex-col " onSubmit={handleSubmitRegister}>
                <InputValue
                  classNameLabel="md:text-[18px] font-bold text-start hover:border-red-500 border-none rounded-md lg:m-[0px]"
                  classNameInput={
                    " p-2 border border-gray-500 md:mt-2 md:mb-0 outline focus:border-blue-500 rounded mt-1 w-full"
                  }
                  text="Fullname *"
                  type="text"
                  name="fullname"
                  value={valueRegister.fullname}
                  onChange={onChangeRegister}
                />
                <InputValue
                  classNameLabel="md:text-[18px] font-bold text-start hover:border-red-500 border-none rounded-md lg:m-0"
                  text="Telephone *"
                  value={valueRegister.phone_number}
                  type="tel"
                  name="phone_number"
                  onChange={onChangeRegister}
                  classNameInput={
                    "w-full p-2 border border-gray-500 md:mt-2 md:mb-0 outline focus:border-blue-500 rounded mt-1"
                  }
                />
                <InputValue
                  classNameLabel="md:text-[18px] font-bold text-start hover:border-red-500 border-none rounded-md"
                  classNameInput={
                    "w-full p-2 border border-gray-500 md:mt-2 md:mb-0 outline focus:border-blue-500 rounded mt-1"
                  }
                  type="Email *"
                  name="email"
                  value={valueRegister.email}
                  text="Email của bạn *"
                  onChange={onChangeRegister}
                />
                <InputValue
                  classNameLabel="md:text-[18px] font-bold text-start hover:border-red-500 border-none rounded-md"
                  text="Address *"
                  type="address"
                  name="address"
                  value={valueRegister.address}
                  onChange={onChangeRegister}
                  classNameInput={
                    "w-full p-2 border border-gray-500 md:mt-2 md:mb-0 outline focus:border-blue-500 rounded mt-1"
                  }
                />
                <InputValue
                  classNameLabel="md:text-[18px] font-bold text-start hover:border-red-500 border-none rounded-md"
                  text="Password *"
                  type="password"
                  name="password"
                  value={valueRegister.password}
                  onChange={onChangeRegister}
                  classNameInput="w-full p-2 border border-gray-500 md:mt-2 md:mb-0 outline focus:border-blue-500 rounded mt-1"
                />
                <div className="terms mt-6 flex ">
                  <input
                    className="mr-2 mt-1"
                    type="checkbox"
                    id="agree"
                    required
                  />
                  <label
                    htmlFor="agree"
                    className="text-[18px] mb-[10px] text-left"
                  >
                    I have read and agree to the{" "}
                    <a href="#" className="">
                      Operational policy
                    </a>{" "}
                    <a href="#" className="text-blue-500 font-bold underline">
                      Privacy policy
                    </a>
                    .
                  </label>
                </div>
                <Link to="/checkout">
                  <Button
                    disabled={isValidCheckRegister}
                    className={`w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full disabled:opacity-50`}
                    text="Create Register"
                    type="submit"
                  />
                </Link>
              </form>
            </div>
          )}
          {!showForm && isModal ? (
            <>
              {isError && (
                <p className="text-center text-red-500">
                  You have entered the wrong Password or Email
                </p>
              )}
              <div className="">
                <h2 className="text-[18px] font-bold lg:mb-4 md:text-[20px] font-medium lg:text-[22px]">
                  Login
                </h2>

                <form onSubmit={handleSubmit}>
                  <InputValue
                    classNameLabel="block text-left font-bold"
                    classNameInput="email w-full p-[0.5rem]  mb-[16px] border border-solid border-gray-300 rounded-[4px]"
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
                  <Button
                    disabled={isValidCheckLogin}
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full disabled:opacity-50"
                    text="Login"
                  />
                </form>
                <NavLink
                  onClick={handleFormRegister}
                  className="text-blue-500 font-bold underline"
                  to={""}
                >
                  Register
                </NavLink>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;
