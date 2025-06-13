import { useModalLoginPages } from "../../../../hooks/dashboard/useModalLoginPages";
import { NavLink } from "react-router-dom";
import "./login.scss";
import InputValue from "../../../../../../common/input";
import Button from "../../../../../../common/button/button";

function ModalLogin() {
  const { handleSubmit, isError, isPending, value, handleOnchange } = useModalLoginPages();
  return (
    <div className="modal-backdrop fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/60 flex justify-center items-center z-[9999]">
      
      {isPending && (<p className="text-center text-blue-500">Saving...</p>)}
      
      <div className="modal-box bg-white p-6 w-[90%] max-w-[400px] rounded-[8px] text-center">
      {isError && (
        <p className="text-center text-red-500">
         You have entered the wrong Password or Email
        </p>
      )}
        <h2 className="text-[18px] md:text-[20px] font-medium lg:text-[22px]">Login</h2>
        <form onSubmit={handleSubmit}>
          <InputValue classNameLabel="block text-left font-bold"  classNameInput="email w-full p-[0.5rem] mb-2.5 border border-solid border-gray-300 rounded-[4px]"  type="email" name="email"  placeholder="Email..."  value={value.email}  onChange={handleOnchange}/>
          <InputValue  classNameLabel="block text-left font-bold" classNameInput="password  w-full p-[0.5rem] mb-2.5 border border-solid border-gray-300 rounded-[4px]" name="password"  type="password"  placeholder="Password..."  onChange={handleOnchange}  value={value.password}/>
          <Button type="submit" text="Login" />
        </form>
        <NavLink className="text-blue-500 font-bold underline" to="/login/register">Register</NavLink>
      </div>
    </div>
  );
}

export default ModalLogin;
