import "../styles.scss";

function OrderOptions() {
  return (
    <div className="order-options">
      <div className="order-options__container">
        <div className="order-options__links">
          <a href="#" className="order-options__link order">Đặt Ngay</a>
          <img src="../../../../src/assets/shipprt.png" alt="" />
          <a className="order-options__link">
            Giao Hàng
          </a>
          <img src="../../../../src/assets/cart-heading.png" alt="" />
          <span className="order-options__separator">hoặc Mang đi</span>
        </div>
        <button className="order-options__button">
          Bắt đầu đặt hàng
        </button>
      </div>
    </div>
  );
}

export default OrderOptions;