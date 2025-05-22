import { useQuery } from "@tanstack/react-query";
import queriesDishlist from "../../../queries/dishlist";
import Header from "../main_page/header_page/header";
import Footer from "../dashboard/footer";

function OrderProduct() {
  /* nếu 1 món ăn chưa đặt thì hiển thị hình ảnh và bắt đầu đặt hàng */

  /* dishlist */

  /*title: giỏ hàng của tôi  */
  /* cột trái :
    - hiển thị danh sách giỏ hàng ( image , title) và nút tăng giảm giá tiền
    - ở dưới là chỉnh sửa -> nếu click vào chỉnh sửa thì vào menu-page 
    Cột phải: title:  1 món và tổng đơn hàng  
    */
  const { isLoading, isError, data: dishlist } = useQuery({ ...queriesDishlist.list });

  if (isLoading || !dishlist) return <div>Loading...</div>;

  if (isError) return <div>Error...</div>
  return (
    <>
    <Header/>
    <div className="max-w-6xl mx-auto px-4 py-8 pt-[100px]">
      <div className="text-sm text-gray-500 mb-4">Ưu Đãi &gt; <span className="text-black font-medium">Combo Vui Đỉnh</span></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <img
            src="/your-image-path/f4028e01-d61e-4e5f-a654-31858b2e9d76.png"
            alt="Combo Vui Đỉnh"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-2">COMBO VUI ĐỈNH</h2>
          <p className="text-gray-700 mb-4">
            3 Miếng Gà + 1 Mì Ý Gà Viên + 1 Khoai Tây Chiên (vừa) + 2 Ly Pepsi (tiêu chuẩn)
          </p>

          <h3 className="text-lg font-semibold border-t pt-4 mb-2">MÓN CỦA BẠN</h3>

          <ul className="space-y-2 text-gray-800">
            <li><strong>3 Fried Chicken:</strong> Gà Rán (3 miếng)</li>
            <li>3x Gà Giòn Không Cay</li>
            <li><strong>Side 1:</strong> Mì Ý Gà Viên <span className="inline-block ml-1 text-black">⚫</span></li>
            <li><strong>Side 2:</strong> Khoai Tây Chiên (Vừa) <span className="inline-block ml-1 text-black">⚫</span></li>
            <li><strong>Drink 1:</strong> Pepsi (Tiêu Chuẩn) <span className="inline-block ml-1 text-black">⚫</span></li>
            <li><strong>Drink 2:</strong> Pepsi (Tiêu Chuẩn) <span className="inline-block ml-1 text-black">⚫</span></li>
          </ul>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default OrderProduct;