import { NavLink } from "react-router-dom";
import "../styles.scss";

function OrderOptions() {
  return (
    <div className="order-options static  bg-[#201224]  p-2 md:p-4 grid grid-cols-1 items-center justify-center text-white md:grid-areas-[links_button]">
      <div className="order-options__container pt-[75px] md:flex justify-center">
        <div className="order-options__links flex items-center">
          <a href="#" className="order-options__link order">Đặt Ngay</a>
          <img src="../../../../src/assets/shipprt.png" alt="" />
          <a className="order-options__link">
            Giao Hàng
          </a>
          <img src="../../../../src/assets/cart-heading.png" alt="" />
          <span className="order-options__separator">hoặc Mang đi</span>
        </div>
        <NavLink to="/menu">
          <button className="order-options__button cursor-pointer">
            Bắt đầu đặt hàng
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default OrderOptions;