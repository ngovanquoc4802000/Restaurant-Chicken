import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "./styles.scss";
import "../styles.scss";

function Header() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const openOffcanvas = () => {
    setIsOffcanvasOpen(true);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };
  return (
    <>
      <header className="header">
        <div className="header__left">
          <div className="header__logo">
            <NavLink to="/">
              <img width={78} height={78} className="logo" src="/src/assets/Screenshot 2025-05-08 164110.png" alt="hình ảnh logo" />
            </NavLink>
          </div>
          <nav className="header__nav-inline">
            <ul className="header__menu-inline">
              <li className="header__menu-item-inline">
                <NavLink to="/menu">
                  THỰC ĐƠN
                </NavLink>
              </li>
              <li className="header__menu-item-inline"><a href="#">KHUYẾN MÃI</a></li>
              <li className="header__menu-item-inline"><a href="#">DỊCH VỤ TIỆC</a></li>
              <li className="header__menu-item-inline"><a href="#">HỆ THỐNG NHÀ HÀNG</a></li>
            </ul>
          </nav>
        </div>

        <div className="header__right">
          <div className="header__icon header__icon--logo">
            <img className="icon-logo-kfc" style={{ width: "30px", height: "30px", position: "absolute", objectFit: "scale-down" }} src="/src/assets/kfclogo.png" alt="Shopping Cart Icon" />
          </div>
          <div className="header__icon header__icon--cart">
            <img className="icon-cart" style={{ width: "30px", height: "30px", position: "absolute", objectFit: "scale-down" }} src="/src/assets/cart1.png" alt="Shopping Cart Icon" />
          </div>
          <div className="header__icon header__icon--login">
            <NavLink to="/login">
              <i className="fa-solid fa-circle-user"></i>
            </NavLink>
          </div>
          <div className="header__icon header__icon--menu" onClick={openOffcanvas}>
            <div className="header__icon--menu-placeholder">
              ☰
            </div>
          </div>
        </div>
        <Outlet />
      </header>
      {/* offcanvas */}
      <div className={`offcanvas-overlay ${isOffcanvasOpen ? 'offcanvas-overlay--visible' : ''}`} onClick={closeOffcanvas}></div>
      <div className={`offcanvas-panel ${isOffcanvasOpen ? 'offcanvas-panel--open' : ''}`}>

        <button className="offcanvas__close-button" onClick={closeOffcanvas}>
          &times;
        </button>

        <div className="offcanvas__content">
          <h3 className="offcanvas__title">DANH MỤC MÓN ĂN</h3>

          <ul className="offcanvas__menu">
            <li className="offcanvas__menu-item">
              <NavLink to="/menu">
                Ưu Đãi
              </NavLink >
            </li>
            <li className="offcanvas__menu-item">
              <NavLink to="/menu">
                Món Mới
              </NavLink >
            </li>
            <li className="offcanvas__menu-item">
              <NavLink to="/menu">
                Combo 1 Người
              </NavLink >
            </li>
            <li className="offcanvas__menu-item">
              <NavLink to="/menu">
                Combo Nhóm
              </NavLink >
            </li>
            <li className="offcanvas__menu-item">
              <NavLink to="/menu">
                Gà Rán - Gà Quay
              </NavLink >
            </li>
            <li className="offcanvas__menu-item">
              <NavLink to="/menu">
                Burger - Cơm - Mì Ý
              </NavLink >
            </li>
            <li className="offcanvas__menu-item">
              <NavLink to="/menu">
                Thức Ăn Nhẹ
              </NavLink >
            </li>
            <li className="offcanvas__menu-item">
              <NavLink to="/menu">
                Thức Uống & Tráng Miệng
              </NavLink >
            </li>
          </ul>

          <h3 className="offcanvas__title">VỀ KFC</h3>

          <ul className="offcanvas__menu">
            <li className="offcanvas__menu-item"><a href="#">Câu Chuyện Của Chúng Tôi</a></li>
            <li className="offcanvas__menu-item"><a href="#">Tin Khuyến Mãi</a></li>
            <li className="offcanvas__menu-item"><a href="#">Tin tức KFC </a></li>
            <li className="offcanvas__menu-item"><a href="#">Tuyển dụng</a></li>
            <li className="offcanvas__menu-item"><a href="#">Đặt tiệc Sinh nhật</a></li>
            <li className="offcanvas__menu-item"><a href="#">Đơn Lớn Giá Hời</a></li>
          </ul>

          <h3 className="offcanvas__title">LIÊN HỆ KFC</h3>

          <ul className="offcanvas__menu">
            <li className="offcanvas__menu-item"><a href="#">Theo dõi đơn hàng</a></li>
            <li className="offcanvas__menu-item"><a href="#">Liên hệ KFC</a></li>
          </ul>

        </div>
      </div>
    </>
  );
}

export default Header;
