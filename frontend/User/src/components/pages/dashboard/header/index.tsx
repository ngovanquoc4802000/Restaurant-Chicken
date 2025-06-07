import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "./styles.scss";
import Button from "../../common/button";

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
      <header className="header lg:sticky fixed top-0 left-0 w-full flex justify-between bg-white z-999 px-[15px] py-[30px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="header__left flex items-center justify-between">
          <div className="header__logo flex items-center justify-center rounded-full">
            <NavLink to="/">
              <img width={78} height={78} className="logo block max-w-full h-auto" src="/src/assets/Screenshot 2025-05-08 164110.png" alt="hình ảnh logo" />
            </NavLink>
          </div>
          <nav className="header__nav-inline hidden">
           <ul className="header__menu-inline list-none p-0 m-0 flex gap-5 md:gap-0">
              <li className="header__menu-item-inline">
                <NavLink
                  className="px-2 hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  to="/menu"
                >
                  THỰC ĐƠN
                </NavLink>
              </li>
              <li className="header__menu-item-inline">
                <a
                  className="px-2 hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  href="#"
                >
                  KHUYẾN MÃI
                </a>
              </li>
              <li className="header__menu-item-inline">
                <a
                  className="px-2 hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  href="#"
                >
                  DỊCH VỤ TIỆC
                </a>
              </li>
              <li className="header__menu-item-inline">
                <a
                  className="px-2 hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  href="#"
                >
                  HỆ THỐNG NHÀ HÀNG
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header__right flex justify-between md:items-center md:justify-end gap-4">
        <div className="header__icon hover:text-[#0d0d0d] w-6 h-6 text-[#333] cursor-pointer flex items-center justify-center header__icon--menu block" onClick={openOffcanvas}>
            <div className="header__icon--menu-placeholder text-[1.5rem] font-bold cursor-pointer text-[#333]">
              ☰
            </div>
          </div>
         
        
          <div className="flex-1 flex justify-center md:justify-start md:hidden">
            <NavLink to="/" className="block">
              <img
                width={78}
                height={78}
                className="logo block max-w-full h-auto"
                src="/src/assets/kfclogo.png"
                alt="hình ảnh logo"
              />
            </NavLink>
          </div>

          <div className="header__icon hover:text-[#0d0d0d] w-6 h-6 text-[#333] cursor-pointer flex items-center justify-center header__icon--login">
            <NavLink to="/login">
              <i className=" text-[28px] mt-2 md:mt-0 lg-0 md:text-[30px] lg:text-[30px] fa-solid fa-circle-user"></i>
            </NavLink>
          </div>
          <div className="header__icon  hover:text-[#0d0d0d] w-6 h-6 text-[#333] cursor-pointer flex items-center justify-center header__icon--cart">
            <NavLink to="/" style={{ width: "30px", height: "30px", position: "absolute", objectFit: "scale-down" }}>
              <img className="block max-w-full h-auto icon-cart" src="/src/assets/cart1.png" alt="Shopping Cart Icon" />
            </NavLink>
          </div>
        
        </div>
        <Outlet />
      </header>
      <div className={`offcanvas-overlay fixed top-0 left-0 right-0 bottom-0 z-[999] invisible bg-[rgba(0,0,0,0.5)] transition-opacity transition-[visibility] duration-300 ease-in-out ${isOffcanvasOpen ? 'offcanvas-overlay--visible visible opacity-100 ' : ''}`} onClick={closeOffcanvas}></div>
      <div className={`offcanvas-panel fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-[1000] overflow-y-auto shadow-[−2px_0_5px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out  ${isOffcanvasOpen ? 'offcanvas-panel--open' : ''}`}>
        <Button text="&times;" onClick={closeOffcanvas} className="offcanvas__close-button absolute top-3 right-3 text-[1.5rem] bg-none border-none cursor-pointer text-[#333] z-10" />
        <div className="offcanvas__content p-5 pt-10">
          <h3 className="offcanvas__title border-b border-gray-300 text-[#e4002b] mt-4 mb-3 text-[1.1rem] font-semibold pb-[5px]">DANH MỤC MÓN ĂN</h3>

          <ul className="offcanvas__menu list-none p-0 mb-5 cursor-pointer">
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">
                Ưu Đãi
              </NavLink >
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">
                Món Mới
              </NavLink >
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">
                Combo 1 Người
              </NavLink >
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">
                Combo Nhóm
              </NavLink >
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">
                Gà Rán - Gà Quay
              </NavLink >
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">
                Burger - Cơm - Mì Ý
              </NavLink >
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">
                Thức Ăn Nhẹ
              </NavLink >
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">
                Thức Uống & Tráng Miệng
              </NavLink >
            </li>
          </ul>

          <h3 className="offcanvas__title border-b border-gray-300 text-[#e4002b] mt-4 mb-3 text-[1.1rem] font-semibold pb-[5px]">VỀ KFC</h3>

          <ul className="offcanvas__menu list-none p-0 ">
            <li className="offcanvas__menu-item mb-2 "><a href="#">Câu Chuyện Của Chúng Tôi</a></li>
            <li className="offcanvas__menu-item mb-2 "><a href="#">Tin Khuyến Mãi</a></li>
            <li className="offcanvas__menu-item mb-2 "><a href="#">Tin tức KFC </a></li>
            <li className="offcanvas__menu-item mb-2 "><a href="#">Tuyển dụng</a></li>
            <li className="offcanvas__menu-item mb-2 "><a href="#">Đặt tiệc Sinh nhật</a></li>
            <li className="offcanvas__menu-item mb-2 "><a href="#">Đơn Lớn Giá Hời</a></li>
          </ul>

          <h3 className="offcanvas__title border-b border-gray-300 text-[#e4002b] mt-4 mb-3 text-[1.1rem] font-semibold pb-[5px]">LIÊN HỆ KFC</h3>

          <ul className="offcanvas__menu list-none p-0 ">
            <li className="offcanvas__menu-item mb-2 "><a href="#">Theo dõi đơn hàng</a></li>
            <li className="offcanvas__menu-item mb-2 "><a href="#">Liên hệ KFC</a></li>
          </ul>

        </div>
      </div>
    </>
  );
}

export default Header;
