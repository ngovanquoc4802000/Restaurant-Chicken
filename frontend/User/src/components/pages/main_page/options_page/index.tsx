import { NavLink } from "react-router-dom";

function OrderOptionsPage() {
  return (
    <div className="order-options bg-[#201224]  p-2 md:p-4 grid grid-cols-1 items-center justify-center text-white md:grid-areas-[links_button]">
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
        <NavLink to="/menu-page">
          <button className="order-options__button rounded-[50px] cursor-pointer">
            Bắt đầu đặt hàng
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default OrderOptionsPage;