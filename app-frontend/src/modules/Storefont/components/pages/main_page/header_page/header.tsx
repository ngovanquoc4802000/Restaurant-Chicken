import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Button from "../../../../../../common/button/button";
import cart1 from "../../../../assets/cart1.png";
import KfcLogoSVG from "../../../../assets/kfc-logo.svg";
import logo from "../../../../assets/kfclogo.png";
import { useHeaderPages } from "../../../../hooks/menu_page/useHeaderPages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

function Header() {
  const {
    open,
    handleClose,
    handleOpen,
    menuItemsData,
    handleNavigate,
  } = useHeaderPages();
  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const userRole = useSelector((state:RootState) => state.userLogin.rule);

  useEffect(() => {
    const data = localStorage.getItem("user_order_history");
    if (data) {
      setUserOrderHistory(JSON.parse(data));
    }
  }, []);
  return (
    <>
      <header className="header lg:sticky fixed top-0 left-0 w-full flex justify-between bg-white z-[999] px-[15px] py-[30px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="header__left flex md:items-center md:justify-center">
          <div className="header__logo flex md:items-center md:justify-center rounded-full">
            <NavLink to="/">
              <img
                className="logo w-[78px] h-[78px] block max-w-full h-auto"
                src={KfcLogoSVG}
                alt="hình ảnh logo"
              />
            </NavLink>
          </div>
          <nav className="header__nav-inline hidden md:flex">
            <ul className="header__menu-inline list-none p-0 m-0 flex gap-5 md:gap-0">
              <li className="header__menu-item-inline">
                <NavLink
                  className="px-2 hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  to="/menu"
                >
                  MENU
                </NavLink>
              </li>
              <li className="header__menu-item-inline">
                <a
                  className="px-2 hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  href="#"
                >
                  DEALS
                </a>
              </li>
              <li className="header__menu-item-inline">
                <a
                  className="px-2 hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  href="#"
                >
                  BOOK A PARTY
                </a>
              </li>
              <li className="header__menu-item-inline">
                <a
                  className="px-2 hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  href="#"
                >
                  FIND A KFC
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-row-reverse lg:flex-row-reverse justify-between md:justify-center-center md:flex-row md:items-center gap-4 md:gap-2">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <AnimatePresence>
              {userRole === "customer" && userOrderHistory.length > 0 && (
                <motion.div
                  key={userOrderHistory.length}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {userOrderHistory.length}
                </motion.div>
              )}
            </AnimatePresence>

            <NavLink to="/orderProductDashBoard">
              <img
                className="block max-w-full h-auto w-[40px] h-[40px] object-scale-down"
                src={cart1}
                alt="Shopping Cart Icon"
              />
            </NavLink>
          </div>

          <div className="w-6 h-6 text-[#333] cursor-pointer flex items-center justify-center text-[1.5rem]">
            <NavLink to="/account">
              <i className="fa-solid fa-circle-user"></i>
            </NavLink>
          </div>
          <div className="flex-1 flex justify-center md:justify-start lg:hidden">
            <NavLink to="/" className="block">
              <img
                width={78}
                height={78}
                className="logo block max-w-full h-auto"
                src={logo}
                alt="hình ảnh logo"
              />
            </NavLink>
          </div>
          <div
            className="w-6 lg:h-8 lg:w-8 h-6 text-[#333] cursor-pointer flex items-center justify-center text-[1.5rem]"
            onClick={handleOpen}
          >
            ☰
          </div>
        </div>
      </header>

      {/* Offcanvas Overlay */}
      <div
        className={`offcanvas-overlay fixed top-0 left-0 right-0 bottom-0 z-[999] bg-[rgba(0,0,0,0.5)] transition-opacity transition-[visibility] duration-300 ease-in-out ${
          open 
            ? "offcanvas-overlay--visible visible opacity-100" 
            : "invisible opacity-0"
        }`}
        onClick={handleClose} 
      ></div>

      {/* Offcanvas Panel */}
      <div
        className={`offcanvas-panel fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-[1000] overflow-y-auto shadow-[−2px_0_5px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out ${
          open
            ? "offcanvas-panel--open translate-x-0"
            : "translate-x-full" 
        }`}
      >
        <Button
          onClick={handleClose} 
          className="offcanvas__close-button absolute top-3 right-3 text-[1.5rem] bg-none border-none cursor-pointer text-[#333] z-10"
          text="&times;"
        />
        <div className="offcanvas__content p-5 pt-10">
          <h3 className="offcanvas__title border-b border-gray-300 text-[#e4002b] mt-4 mb-3 text-[1.1rem] font-semibold pb-[5px]">
            CATEGORY DISH
          </h3>

          <ul className="offcanvas__menu list-none p-0 mb-5">
            {menuItemsData.map((item, index) => (
              <li key={index} className="offcanvas__menu-item mb-2">
                <Button
                  className="text-left w-full hover:underline cursor-pointer text-base font-medium text-[#333]"
                  text={item.label}
                  onClick={() => {
                    handleNavigate(item.path);
                    handleClose();
                  }}
                />
              </li>
            ))}
          </ul>

          <h3 className="offcanvas__title border-b border-gray-300 text-[#e4002b] mt-4 mb-3 text-[1.1rem] font-semibold pb-[5px]">
            About KFC
          </h3>

          <ul className="offcanvas__menu list-none p-0 ">
            <li className="offcanvas__menu-item cursor-pointer hover:underline mb-2 ">
              <a href="#">Our Story</a>
            </li>
            <li className="offcanvas__menu-item cursor-pointer hover:underline mb-2 ">
              <a href="#">Promotion News</a>
            </li>
            <li className="offcanvas__menu-item cursor-pointer hover:underline mb-2 ">
              <a href="#">KFC NEWS </a>
            </li>
            <li className="offcanvas__menu-item cursor-pointer hover:underline mb-2 ">
              <a href="#">KFC Jobs</a>
            </li>
            <li className="offcanvas__menu-item cursor-pointer hover:underline mb-2 ">
              <a href="#">Book Your Party</a>
            </li>
            <li className="offcanvas__menu-item cursor-pointer hover:underline mb-2 ">
              <a href="#">Big Order</a>
            </li>
          </ul>

          <h3 className="offcanvas__title border-b border-gray-300 text-[#e4002b] mt-4 mb-3 text-[1.1rem] font-semibold pb-[5px]">
            Contact KFC
          </h3>

          <ul className="offcanvas__menu list-none p-0 ">
            <li className="offcanvas__menu-item cursor-pointer hover:underline mb-2 ">
              <a href="#">Order Tracker</a> 
            </li>
            <li className="offcanvas__menu-item cursor-pointer hover:underline mb-2 ">
              <a href="#">Contact Us</a> 
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
