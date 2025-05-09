import { useState } from "react";
import "./styles.scss";

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
          <nav className="header__nav-inline">
            <ul className="header__menu-inline">
              <li className="header__menu-item-inline"><a href="#">THỰC ĐƠN</a></li>
              <li className="header__menu-item-inline"><a href="#">KHUYẾN MÃI</a></li>
              <li className="header__menu-item-inline"><a href="#">DỊCH VỤ TIỆC</a></li>
              <li className="header__menu-item-inline"><a href="#">HỆ THỐNG NHÀ HÀNG</a></li>
            </ul>
          </nav>
        </div>
        <div className="header__right">
          <div className="header__icon header__icon--cart">
            <img className="icon-cart" style={{ width: "30px", height: "30px", position: "absolute", objectFit: "scale-down" }} src="/src/assets/cart1.png" alt="Shopping Cart Icon" />
          </div>
          <div className="header__icon header__icon--login">
            <i className="fa-solid fa-circle-user"></i>
          </div>
          <div className="header__icon header__icon--menu" onClick={openOffcanvas}>
            <div className="header__icon--menu-placeholder">
              ☰
            </div>
          </div>
        </div>
      </header>
      <div className="order-options">
        <div className="order-options__links">
          <a href="#" className="order-options__link">Đặt Ngay</a>
          <img src="../../../../src/assets/shipprt.png" alt="" />
          <a href="#" className="order-options__link">
            Giao Hàng
          </a>
          <img src="../../../../src/assets/cart-heading.png" alt="" />
          <span className="order-options__separator">hoặc Mang đi</span>
        </div>
        <button className="order-options__button">
          Bắt đầu đặt hàng
        </button>
      </div>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Party.webp?v=g99R2g" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Combo99k.webp?v=g99R2g" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/GWP.webp?v=g99R2g" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* offcanvas */}
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
