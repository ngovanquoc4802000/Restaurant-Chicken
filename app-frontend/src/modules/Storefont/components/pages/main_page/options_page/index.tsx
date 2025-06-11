import { NavLink } from "react-router-dom";
import Button from "../../../../../../common/button/button";
import shipping from "../../../../assets/shipprt.png";
import cart from "../../../../assets/cart-heading.png";

function OrderOptionsPage() {
  return (
    <div className="order-options  bg-[#201224]  p-2 md:p-4 grid grid-cols-1 items-center justify-center text-white md:grid-areas-[links_button]">
      <div className="order-options__container pt-[75px] lg:pt-[0px] md:pt-[100px]  md:flex justify-center">
        <div className="order-options__links flex items-center">
          <a href="#" className="order-options__link order">
            Book now
          </a>
          <img src={shipping} alt="" />
          <a className="order-options__link">delivery</a>
          <img src={cart} alt="" />
          <span className="order-options__separator">or take away</span>
        </div>
        <NavLink to="/menu-page">
          <Button
            className="order-options__button rounded-[50px] cursor-pointer"
            text="Start order"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default OrderOptionsPage;
