import { NavLink } from "react-router-dom";
import Button from "../../../../../../common/button/button";
import "../styles.scss";
import shipping from "../../../../assets/shipprt.png";
import cart from "../../../../assets/cart-heading.png";

function OrderOptions() {
  return (
    <div className="order-options block  static bg-[#201224] md:pt-[9.4rem] md:pb-[1rem] lg:pt-[1rem] grid grid-cols-1 items-center justify-center text-white md:grid-areas-[links_button]">
      <div className="order-options__container pt-[105px] md:pt-[0px] md:flex justify-center">
        <div className="order-options__links  flex items-center">
          <a
            href="#"
            className="order-options__link lg:text-[16px] cursor-pointer font-bold  lg:py-[5px] md:py-[5px] lg:px-[15px] md:px-[15px] decoration-none md:px-[5px] md:py-[15px] order text-[16px] md:text-[18px]"
          >
            Book now
          </a>
          <img className="w-[27px]" src={shipping} alt="" />
          <a className="order-options__link font-bold  lg:text-[16px] text-[16px] md:text-[18px] lg:py-[5px] md:py-[5px] lg:px-[15px] md:px-[15px] decoration-none md:px-[5px] md:py-[15px]">
            delivery
          </a>
          <img className="w-[27px]" src={cart} alt="" />
          <span className="order-options__separator text-white font-bold text-[15px] hover:underline ml-2 mr-2 cursor-pointer font-black text-[16px] lg:text-[15px] font-bold md:text-[18px]">
            or Take away
          </span>
        </div>
        <NavLink to="/menu">
          <Button
            className="order-options__button  transition: background-color 0.3s ease;  text-white border-none py-[10px] lg:text-[15px] md:text-[15px] text-[15px] px-[20px] text-[1rem] font-black cursor-pointer bg-red-700 hover:bg-red-600 rounded-[50px] cursor-pointer text-[16px] md:text-[18px]"
            text="Start order"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default OrderOptions;
