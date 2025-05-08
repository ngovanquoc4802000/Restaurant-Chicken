import { useState } from "react";
import "./styles.scss";

const MenuIcon = () => (
  <div className="header__icon--menu-placeholder">
    ☰
  </div>
);

function Dashboard() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const openOffcanvas = () => {
    setIsOffcanvasOpen(true);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };
  return (
    <div className="Dashboard">
      <header className="header">
        <div className="header__left">
          <div className="header__logo">
            <img width={78} height={78} className="logo" src="/src/assets/Screenshot 2025-05-08 164110.png" alt="hình ảnh logo" />
          </div>
        </div>
        <nav className="header__nav-inline"> 
          <ul className="header__menu-inline"> 
            <li className="header__menu-item-inline"><a href="#">THỰC ĐƠN</a></li>
            <li className="header__menu-item-inline"><a href="#">KHUYẾN MÃI</a></li>
            <li className="header__menu-item-inline"><a href="#">DỊCH VỤ TIỆC</a></li>
            <li className="header__menu-item-inline"><a href="#">HỆ THỐNG NHÀ HÀNG</a></li>
          </ul>
        </nav>
        <div className="header__right">
          <div className="header__icon header__icon--cart">
            <img width={40} height={40} src="/src/assets/cart.png" alt="Shopping Cart Icon" />
          </div>

          <div className="header__icon header__icon--menu" onClick={openOffcanvas}>
            <MenuIcon />
          </div>
        </div>
      </header>
      <div className={`offcanvas-overlay ${isOffcanvasOpen ? 'offcanvas-overlay--visible' : ''}`} onClick={closeOffcanvas}></div>

      <div className={`offcanvas-panel ${isOffcanvasOpen ? 'offcanvas-panel--open' : ''}`}>

        <button className="offcanvas__close-button" onClick={closeOffcanvas}>
          &times; 
        </button>

        <div className="offcanvas__content">
          <h3 className="offcanvas__title">DANH MỤC MÓN ĂN</h3>
          <ul className="offcanvas__menu">
            <li className="offcanvas__menu-item"><a href="#">Ưu Đãi</a></li>
            <li className="offcanvas__menu-item"><a href="#">Món Mới</a></li>
            <li className="offcanvas__menu-item"><a href="#">Combo 1 Người</a></li>
            <li className="offcanvas__menu-item"><a href="#">Combo Nhóm</a></li>
            <li className="offcanvas__menu-item"><a href="#">Gà Rán - Gà Quay</a></li>
            <li className="offcanvas__menu-item"><a href="#">Burger - Cơm - Mì Ý </a></li>
            <li className="offcanvas__menu-item"><a href="#">Thức Ăn Nhẹ </a></li>
            <li className="offcanvas__menu-item"><a href="#">Thức Uống & Tráng Miệng </a></li>
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
    </div>
  );
}

export default Dashboard;
