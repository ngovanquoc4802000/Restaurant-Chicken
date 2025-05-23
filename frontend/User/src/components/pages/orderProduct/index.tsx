import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cartSlice";
import type { RootState } from "../../../store/store";
import Footer from "../dashboard/footer";
import Header from "../main_page/header_page/header";
import Button from "../common/button";
import { NavLink } from "react-router-dom";

function OrderProduct() {
  
  const cart = useSelector((state: RootState) => state.cart);

  const sumOrder = cart.reduce((sum, acc) => (sum + acc.quantity), 0);

  const total_price = cart.reduce((sum, acc) => (sum + acc.price * acc.quantity), 0)

  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Header />
      {
        cart.length > 0 ? (
          <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
            <h1 className="text-3xl font-bold mb-6">GIỎ HÀNG CỦA TÔI</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 shadow-2xl p-4 rounded-2xl ">
                {cart.map(item => (
                  <div key={item.id_dishlist} className="flex items-center gap-4 border-b py-4">
                    <img src={item.image} alt={item.title} className="w-[100px] p-2 rounded-2xl shadow-md h-[100px] object-cover rounded" />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p>SL: {item.quantity}</p>
                      <p>Giá: {item.price} VND</p>
                      <p>Ghi chú: {item.note}</p>
                    </div>
                    <Button text="Xóa" onClick={() => handleRemove(item.id_dishlist)} className="bg-red-600 hover:bg-red-500 cursor-pointer text-white px-4 py-2 rounded" />
                  </div>
                ))}
              </div>
              <div className="bg-white  rounded-lg shadow-2xl min-h-full p-10 h-fit">
                <h2 className="text-xl font-bold mb-4">2 MÓN</h2>
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Bạn có Mã giảm giá?</p>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="🎁 Gợi ý: Nhập mã để giảm 10% cho đơn hàng trên 100K!"
                      className="flex-1 border-b border-gray-400 focus:outline-none focus:border-black"
                    />
                    <button className="bg-black text-white px-4 py-1 rounded-full text-sm">Áp dụng</button>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-4 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Tổng đơn hàng</span>
                    <span>{sumOrder} Đơn</span>
                  </div>
                  <div className="flex justify-between font-bold text-base">
                    <span>Tổng thanh toán</span>
                    <span>{total_price.toFixed(3)} VND</span>
                  </div>
                </div>
                <Button text={`Thanh Toán ${total_price.toFixed(3)} VND`} className="cursor-pointer mt-6 w-full font-black bg-red-600 text-white text-lg py-3 rounded-full shadow hover:bg-red-700" />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <img src="https://static.kfcvietnam.com.vn/images/web/empty-cart.png?v=5.0" className="mx-auto w-40 h-40 mb-4" />
            <p className="text-gray-600 text-xl mb-4">Không có sản phẩm nào trong giỏ hàng</p>
            <NavLink to="/menu-page" className="inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition">
              Bắt đầu đặt hàng
            </NavLink>
          </div>
        )
      }
      <Footer />
    </>
  );
}

export default OrderProduct;