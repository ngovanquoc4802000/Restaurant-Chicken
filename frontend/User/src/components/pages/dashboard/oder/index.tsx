import { NavLink } from "react-router-dom";
import "../styles.scss";

function OrderOptions() {
  return (
    <div className="order-options static bg-[#201224]  p-2 md:p-4 grid grid-cols-1 items-center justify-center text-white md:grid-areas-[links_button]">
      <div className="order-options__container pt-[105px] md:pt-[0px] md:flex justify-center">
        <div className="order-options__links flex items-center">
          <a href="#" className="order-options__link order text-[16px] md:text-[18px]">Đặt Ngay</a>
          <img src="../../../../src/assets/shipprt.png" alt="" />
          <a className="order-options__link text-[16px] md:text-[18px]">
            Giao Hàng
          </a>
          <img src="../../../../src/assets/cart-heading.png" alt="" />
          <span className="order-options__separator text-[16px] md:text-[18px]">hoặc Mang đi</span>
        </div>
        <NavLink to="/menu">
          <button className="order-options__button rounded-[50px] cursor-pointer text-[16px] md:text-[18px] ">
            Bắt đầu đặt hàng
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default OrderOptions;