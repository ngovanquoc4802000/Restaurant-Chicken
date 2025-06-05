import type { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { open, close } from "../../features/modal";
import Button from "../../common/button";
import { AnimatePresence, motion } from "framer-motion";

function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.map((item) => item));

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const dispatch = useDispatch();

  const isOffcanvasOpen = useSelector((state: RootState) => state.loginModal);

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    dispatch(close()); 
    setTimeout(() => {
      navigate(path); 
    }, 50); 
  };
  return (
    <>
      <header className="header lg:sticky fixed top-0 left-0 w-full flex justify-between bg-white z-[999] px-[15px] py-[30px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="header__left flex items-center justify-between">
          <div className="header__logo flex  md:items-center md:justify-center rounded-full">
            <NavLink to="/home">
              <img className="logo w-[78px] h-[78px] block max-w-full h-auto block" src="/src/assets/Screenshot 2025-05-08 164110.png" alt="hình ảnh logo" />
            </NavLink>
          </div>
          <nav className="header__nav-inline hidden">
            <ul className="header__menu-inline list-none p-0 m-0 flex gap-5">
              <li className="header__menu-item-inline">
                <NavLink className="px-2 py-0 block text-lg no-underline hover:text-[#0d0d0d] font-semibold text-[#201224]" to="/menu-page">
                  THỰC ĐƠN
                </NavLink>
              </li>
              <li className="header__menu-item-inline"><a className="px-2 py-0 block text-lg no-underline hover:text-[#0d0d0d] font-semibold text-[#201224]" href="#">KHUYẾN MÃI</a></li>
              <li className="header__menu-item-inline"><a className="px-2 py-0 block text-lg no-underline hover:text-[#0d0d0d] font-semibold text-[#201224]" href="#">DỊCH VỤ TIỆC</a></li>
              <li className="header__menu-item-inline"><a className="px-2 py-0 block text-lg no-underline hover:text-[#0d0d0d] font-semibold text-[#201224]" href="#">HỆ THỐNG NHÀ HÀNG</a></li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-row-reverse lg:flex-row-reverse justify-between md:justify-center-center md:flex-row md:items-center gap-4 md:gap-2">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <AnimatePresence>
              {totalQuantity > 0 && (
                <motion.div
                  key={totalQuantity}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalQuantity}
                </motion.div>
              )}
            </AnimatePresence>

            <NavLink to="/orderProduct">
              <img
                className="block max-w-full h-auto w-[40px] h-[40px] object-scale-down "
                src="/src/assets/cart1.png"
                alt="Shopping Cart Icon"
              />
            </NavLink>
          </div>

          <div className="w-6 h-6 text-[#333] cursor-pointer flex items-center justify-center text-[1.5rem]">
            <NavLink to="/account">
              <i className=" fa-solid fa-circle-user"></i>
            </NavLink>
          </div>
          <div className="flex-1 flex justify-center md:justify-start lg:hidden">
            <NavLink to="/home" className="block">
              <img
                width={78}
                height={78}
                className="logo block max-w-full h-auto"
                src="/src/assets/kfclogo.png"
                alt="hình ảnh logo"
              />
            </NavLink>
          </div>
          <div
            className="w-6 lg:h-8 lg:w-8 h-6 text-[#333] cursor-pointer flex items-center justify-center text-[1.5rem]"
            onClick={() => dispatch(open())}
          >
            ☰
          </div>

        </div>

      </header>

      <div className={`offcanvas-overlay fixed top-0 left-0 right-0 bottom-0 z-[999] invisible bg-[rgba(0,0,0,0.5)] transition-opacity transition-[visibility] duration-300 ease-in-out ${isOffcanvasOpen ? 'offcanvas-overlay--visible visible opacity-100 ' : ''}`} onClick={() => dispatch(close())}></div><div className={`offcanvas-panel fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-[1000] overflow-y-auto shadow-[−2px_0_5px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out  ${isOffcanvasOpen ? 'offcanvas-panel--open' : ''}`}>
        <Button onClick={() => dispatch(close())} className="offcanvas__close-button absolute top-3 right-3 text-[1.5rem] bg-none border-none cursor-pointer text-[#333] z-10" text="&times;" />
        <div className="offcanvas__content p-5 pt-10">
          <h3 className="offcanvas__title border-b border-gray-300 text-[#e4002b] mt-4 mb-3 text-[1.1rem] font-semibold pb-[5px]">DANH MỤC MÓN ĂN</h3>

          <ul className="offcanvas__menu list -none p-0 mb-5">
            <li className="offcanvas__menu-item mb-2 ">
              <button
                onClick={() => handleNavigate("/menu-page")}
                className="text-left w-full text-base font-medium text-[#333]"
              >
                Ưu Đãi
              </button>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <button
                onClick={() => handleNavigate("/menu-page")}
                className="text-left w-full text-base font-medium text-[#333]"
              >
                Món mới
              </button>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <button
                onClick={() => handleNavigate("/menu-page")}
                className="text-left w-full text-base font-medium text-[#333]"
              >
                Combo 1 Người
              </button>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <button
                onClick={() => handleNavigate("/menu-page")}
                className="text-left w-full text-base font-medium text-[#333]"
              >
                Combo Nhóm
              </button>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <button
                onClick={() => handleNavigate("/menu-page")}
                className="text-left w-full text-base font-medium text-[#333]"
              >
                Gà Rán - Gà Quay
              </button>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
              <button
                onClick={() => handleNavigate("/menu-page")}
                className="text-left w-full text-base font-medium text-[#333]"
              >
              Burger - Cơm - Mỳ Ý
              </button>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
            <button
                onClick={() => handleNavigate("/menu-page")}
                className="text-left w-full text-base font-medium text-[#333]"
              >
                Thức ăn nhẹ
              </button>
            </li>
            <li className="offcanvas__menu-item mb-2 ">
            <button
                onClick={() => handleNavigate("/menu-page")}
                className="text-left w-full text-base font-medium text-[#333]"
              >
               Thức uống & Tráng miệng
              </button>
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