import { useModalLoginPages } from "../../../../hooks/dashboard/useModalLoginPages";
import { NavLink } from "react-router-dom";
import Button from "../../common/button";
import InputValue from "../../common/input";
import "./login.scss";

function ModalLogin() {
  const { handleSubmit, isError, isPending, value, handleOnchange } = useModalLoginPages();
  return (
    <div className="modal-backdrop">
      {isPending && (
        <p className="text-center text-blue-500">Saving...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">
          Bạn đã nhập sai Password hoặc Email
        </p>
      )}
      <div className="modal-box">
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <InputValue text="Email" classNameInput="email"  type="email" name="email"  placeholder="Nhập email"  value={value.email}  onChange={handleOnchange}/>
          <InputValue classNameInput="password" name="password"  type="password"  placeholder="Nhập mật khẩu"  onChange={handleOnchange}  value={value.password}/>
          <Button type="submit" text="Đăng nhập" />
        </form>
        <NavLink to="/login/register">Đăng kí</NavLink>
      </div>
    </div>
  );
}

export default ModalLogin;
