import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../../../../../common/button/button";
import cart1 from "../../../../assets/cart1.png";
import KfcLogoSVG from "../../../../assets/kfc-logo.svg";
import logoMobile from "../../../../assets/kfclogo.png";
import type { RootState } from "../../../../store/store";
import "./styles.scss";

function Header() {
  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const openOffcanvas = () => {
    setIsOffcanvasOpen(true);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };
  const navigate = useNavigate();
  const userRole = useSelector((state: RootState) => state.userLogin.rule);
  const handleUser = () => {
    if (userRole === "customer") {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("user_order_history");
    if (data) {
      setUserOrderHistory(JSON.parse(data));
    }
  }, []);
  return (
    <>
      <header className="header flex-col lg:flex-row md:flex-row  md:flex p-[1.2rem]  md:px-[15px] lg:items-center md:gap-y-0 md:justify-around md:py-[30px] lg:sticky fixed top-0 left-0 w-full flex justify-between bg-white z-999 px-[15px]  shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="header__left md: flex items-center justify-between">
          <div className="header__logo flex items-center justify-center rounded-full">
            <NavLink to="/">
              <img
                width={78}
                height={78}
                className="logo block max-w-full h-auto hidden lg:block md:block"
                src={KfcLogoSVG}
                alt="hình ảnh logo"
              />
            </NavLink>
          </div>
          <nav className="header__nav-inline hidden">
            <ul className="header__menu-inline list-none p-0 m-0 flex gap-5 md:gap-0">
              <li className="header__menu-item-inline">
                <NavLink
                  className="px-2 md:text-[20px] hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  to="/menu"
                >
                  MENU
                </NavLink>
              </li>
              <li className="header__menu-item-inline">
                <a
                  className="px-2 md:text-[20px] hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  href="#"
                >
                  DEALS
                </a>
              </li>
              <li className="header__menu-item-inline">
                <a
                  className="px-2 md:text-[20px] hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  href="#"
                >
                  BOOK A PARTY
                </a>
              </li>
              <li className="header__menu-item-inline">
                <a
                  className="px-2 md:text-[20px] hover:underline py-0 block md:text-[15px] xl:text-[20px] lg:text-[20px] md:ml-2 md:p-0 hover:text-[#0d0d0d] font-semibold text-[#201224]"
                  href="#"
                >
                  FIND A KFC
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header__right flex justify-between md:items-center md:justify-end gap-4">
          <div
            className="header__icon hover:text-[#0d0d0d] w-6 h-6 text-[#333] cursor-pointer flex items-center justify-center header__icon--menu block"
            onClick={openOffcanvas}
          >
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
                src={logoMobile}
                alt="hình ảnh logo"
              />
            </NavLink>
          </div>

          <div className="header__icon hover:text-[#0d0d0d] mt-[-3px] md:mt-[0px] lg:mt-[0px]  w-6 h-6 text-[#333] cursor-pointer flex items-center justify-center header__icon--login">
            <NavLink onClick={handleUser} to={""}>
              <i className=" text-[28px] mt-2 md:mt-0 lg-0 md:text-[30px] lg:text-[30px] fa-solid fa-circle-user"></i>
            </NavLink>
          </div>

          <div className="header__icon  hover:text-[#0d0d0d] w-6 h-6 text-[#333] cursor-pointer flex items-center justify-center header__icon--cart">
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
          </div>
        </div>
        <Outlet />
      </header>
      <div
        className={`offcanvas-overlay fixed top-0 left-0 right-0 bottom-0 z-[999] invisible bg-[rgba(0,0,0,0.5)] transition-opacity transition-[visibility] duration-300 ease-in-out ${
          isOffcanvasOpen
            ? "offcanvas-overlay--visible visible opacity-100 "
            : ""
        }`}
        onClick={closeOffcanvas}
      ></div>
      <div
        className={`offcanvas-panel fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-[1000] overflow-y-auto shadow-[−2px_0_5px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out  ${
          isOffcanvasOpen ? "offcanvas-panel--open" : ""
        }`}
      >
        <Button
          text="&times;"
          onClick={closeOffcanvas}
          className="offcanvas__close-button absolute top-3 right-3 text-[1.5rem] bg-none border-none cursor-pointer text-[#333] z-10"
        />
        <div className="offcanvas__content p-5 pt-10">
          <h3 className="offcanvas__title border-b border-gray-300 text-[#e4002b] mt-4 mb-3 text-[1.1rem] font-semibold pb-[5px]">
            CATEGORY DISH
          </h3>

          <ul className="offcanvas__menu list-none p-0 mb-5 cursor-pointer">
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">Hot deals</NavLink>
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">New products</NavLink>
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">Combo for 1</NavLink>
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">Combo for sharing</NavLink>
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">Fried & Roasted</NavLink>
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">Rice - Burger - Pasta</NavLink>
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">Snack</NavLink>
            </li>
            <li className="offcanvas__menu-item hover:underline mb-2 ">
              <NavLink to="/menu">Dessert & Drinks</NavLink>
            </li>
          </ul>

          <h3 className="offcanvas__title border-b border-gray-300 text-[#e4002b] mt-4 mb-3 text-[1.1rem] font-semibold pb-[5px]">
            About KFC
          </h3>

          <ul className="offcanvas__menu list-none p-0 ">
            <li className="offcanvas__menu-item mb-2 ">
              <a href="#">Our Story</a>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <a href="#">Promotion News</a>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <a href="#">KFC NEWS </a>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <a href="#">KFC Jobs</a>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <a href="#">Book Your Party</a>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <a href="#">Big Order</a>
            </li>
          </ul>

          <h3 className="offcanvas__title border-b border-gray-300 text-[#e4002b] mt-4 mb-3 text-[1.1rem] font-semibold pb-[5px]">
            Contact Us
          </h3>

          <ul className="offcanvas__menu list-none p-0 ">
            <li className="offcanvas__menu-item mb-2 ">
              <a href="#">Order Tracked</a>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <a href="#">Find a KFC</a>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
