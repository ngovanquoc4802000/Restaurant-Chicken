import { NavLink } from "react-router-dom";
import Button from "../../../../../../common/button/button";
import "../styles.scss";
import shipping from "../../../../assets/shipprt.png";
import cart from "../../../../assets/cart-heading.png";

function OrderOptions() {
  return (
    <div className="order-options static bg-[#201224]  p-2 md:p-4 grid grid-cols-1 items-center justify-center text-white md:grid-areas-[links_button]">
      <div className="order-options__container pt-[105px] md:pt-[0px] md:flex justify-center">
        <div className="order-options__links flex items-center">
          <a
            href="#"
            className="order-options__link order text-[16px] md:text-[18px]"
          >
            Book now
          </a>
          <img src={shipping} alt="" />
          <a className="order-options__link text-[16px] md:text-[18px]">
            delivery
          </a>
          <img src={cart} alt="" />
          <span className="order-options__separator text-[16px] md:text-[18px]">
            or Take away
          </span>
        </div>
        <NavLink to="/menu">
          <Button
            className="order-options__button rounded-[50px] cursor-pointer text-[16px] md:text-[18px]"
            text="Start order"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default OrderOptions;
