import "./login.scss";

function ModalLogin() {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Đăng Nhập</h2>
        <form >
          <label>Email</label>
          <input
            type="email"
            placeholder="Nhập email"
          />

          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
          />
          <button type="submit">Đăng Nhập</button>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;