import { useModalLoginPages } from "../../../../hooks/dashboard/useModalLoginPages";
import { NavLink } from "react-router-dom";
import "./login.scss";
import InputValue from "../../../../../../common/input";
import Button from "../../../../../../common/button/button";

function ModalLogin() {
  const { handleSubmit, isError, isPending, value, handleOnchange } = useModalLoginPages();
  return (
    <div className="modal-backdrop">
      
      {isPending && (<p className="text-center text-blue-500">Saving...</p>)}
      
      {isError && (
        <p className="text-center text-red-500">
         You have entered the wrong Password or Email
        </p>
      )}
      <div className="modal-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <InputValue  classNameInput="email"  type="email" name="email"  placeholder="Email..."  value={value.email}  onChange={handleOnchange}/>
          <InputValue classNameInput="password" name="password"  type="password"  placeholder="Password..."  onChange={handleOnchange}  value={value.password}/>
          <Button type="submit" text="Login" />
        </form>
        <NavLink to="/login/register">Register</NavLink>
      </div>
    </div>
  );
}

export default ModalLogin;
