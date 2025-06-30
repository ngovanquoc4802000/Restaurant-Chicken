import InputValue from "$/common/input";
import TextareaValue from "$/common/textarea";
import { useProductDetailPages } from "$/modules/Storefont/hooks/menu_page/useProductDetailPages";
import Footer from "../../footer";
import Header from "../../header";

function CheckOutPages() {
  const {
    isLoading,
    error,
    dishlist,
    orderData,
   /*  orderDetails, */
    isError,
    isSuccess,
    handleCart,
    handleInputChange,
  /*   handleNoteChange, */
  } = useProductDetailPages();

  if (isLoading || !dishlist) return <div>Loading...</div>;

  if (error) return `Error Product Details ${error}`;

  return (
    <div className="productDetail-container cursor-pointer">
      {isSuccess && <div>Success...</div>}

      {isError && <div>Error...</div>}

      <Header />
      <main className="flex-grow container mx-auto mt-24 mb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-6 border-b pb-4">
                GIỎ HÀNG CỦA TÔI
              </h2>
              {dishlist.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  Giỏ hàng của bạn đang trống.
                </p>
              ) : (
                <div className="space-y-4">
                  {dishlist.map((dish) => (
                    <div
                      key={dish.id}
                      className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-lg bg-white border border-gray-200"
                    >
                  {/*     <img
                        src={
                          dish.image ||
                          `https://placehold.co/150x100?text=${dish.name.replace(
                            /\s/g,
                            "+"
                          )}`
                        }
                        alt={dish.name}
                        className="w-full h-32 sm:w-32 sm:h-24 object-cover rounded-md shadow-sm flex-shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/150x100?text=${dish.name.replace(
                            /\s/g,
                            "+"
                          )}`;
                        }}
                      /> */}
                      <div className="flex-1 w-full text-center sm:text-left">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">
                          {dish.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {dish.description}
                        </p>
                        <div className="flex justify-center sm:justify-start items-center mt-3 text-sm">
                          <a
                            href="#"
                            className="text-blue-600 hover:underline mr-4"
                          >
                            Chỉnh sửa
                          </a>
                          <a href="#" className="text-blue-600 hover:underline">
                            Xóa
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between h-full">
                        <div className="flex items-center border border-gray-300 rounded-full px-2 py-1 text-sm">
                          <button className="text-gray-500 hover:text-red-500 px-1 font-bold">
                            -
                          </button>
                          <span className="mx-2 font-semibold">
                         {/*    {dish.quantity} */}
                          </span>
                          <button className="text-gray-500 hover:text-red-500 px-1 font-bold">
                            +
                          </button>
                        </div>
                        <span className="text-lg font-bold text-red-600 mt-2 sm:mt-0">
                          {dish.price.toLocaleString("vi-VN")}₫
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Suggested Items Section - Horizontal Scroll */}
            <div className="bg-gray-800 text-white rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl md:text-2xl font-extrabold mb-6 border-b border-gray-600 pb-4">
                SẼ NGON HƠN KHI THƯỞNG THỨC CÙNG...
              </h2>
              <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:px-0 sm:-mx-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
            {/*     {suggestedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-32 sm:w-40 md:w-48 mr-4 last:mr-0 flex flex-col items-center p-3 rounded-lg bg-gray-700 shadow-md transform hover:scale-105 transition duration-200"
                  >
                    <img
                      src={
                        item.image ||
                        `https://placehold.co/100x100?text=${item.name.replace(
                          /\s/g,
                          "+"
                        )}`
                      }
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md mb-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/100x100?text=${item.name.replace(
                          /\s/g,
                          "+"
                        )}`;
                      }}
                    />
                    <p className="text-sm font-semibold text-center leading-tight mb-1">
                      {item.name}
                    </p>
                    <p className="text-red-400 text-md font-bold">
                      {item.price.toLocaleString("vi-VN")}₫
                    </p>
                    <button className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      Thêm
                    </button>
                  </div>
                ))} */}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary and Form */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-6 border border-gray-200">
            {/* Order Summary Header */}
            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-3">
              {dishlist.length} MÓN {/* Dynamic count of items */}
            </h3>

            {/* Discount Code Section */}
            <div className="mb-4">
              <p className="text-gray-700 text-sm mb-2">Bạn có Mã giảm giá?</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Mã giảm giá *"
                  className="flex-grow border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                />
           {/*      <Button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition text-sm">
                  Áp dụng
                </Button> */}
              </div>
            </div>

            {/* Order Summary Details */}
            <div className="space-y-2 text-gray-800 font-semibold text-base">
              <div className="flex justify-between">
                <span>Tổng đơn hàng:</span>
            {/*     <span>{subtotal.toLocaleString("vi-VN")}₫</span> */}
              </div>
              <div className="flex justify-between">
                <span>Phí giao hàng:</span>
                <span>Miễn phí</span> {/* Assuming free delivery for now */}
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-3 mt-3">
                <span>Tổng thanh toán:</span>
                <span className="text-red-600">
             {/*      {totalPayment.toLocaleString("vi-VN")}₫ */}
                </span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCart} className="space-y-4 pt-4 border-t">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Thông tin giao hàng
              </h3>
              <InputValue
                text="Địa chỉ nhận hàng"
                placeholder="Địa chỉ..."
                type="text"
                classNameLabel="block font-semibold text-gray-700"
                classNameInput="" // Tailwind already applies base styles
                name="address"
                value={orderData.address}
                onChange={handleInputChange}
              />
              <InputValue
                text="Họ và tên"
                placeholder="Tên khách hàng..."
                type="text"
                name="customer_name"
                classNameLabel="block font-semibold text-gray-700"
                classNameInput=""
                onChange={handleInputChange}
                value={orderData.customer_name}
              />
              <InputValue
                text="Số điện thoại"
                placeholder="Số điện thoại khách hàng..."
                type="tel"
                name="customer_phone"
                classNameLabel="block font-semibold text-gray-700"
                classNameInput=""
                onChange={handleInputChange}
                value={orderData.customer_phone}
              />
              <TextareaValue
                text="Ghi chú đơn hàng"
                placeholder="Ghi chú của khách hàng..."
                name="customer_note"
                value={orderData.customer_note}
                onChange={handleInputChange}
                classNameLabel="block font-semibold text-gray-700"
                classNameInput=""
              />
              {/* Removed the redundant 'Notes' input based on previous conversation */}
              {/* <InputValue
                                text="Ghi chú khác"
                                placeholder="Ghi chú thêm..."
                                type="text"
                                name="note"
                                classNameLabel="block font-semibold text-gray-700"
                                classNameInput=""
                                onChange={handleNoteChange}
                                value={orderDetails.note}
                            /> */}

         {/*      <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 md:py-4 rounded-full transition-colors duration-300 shadow-md text-lg"
              >
                Thanh toán {totalPayment.toLocaleString("vi-VN")}₫
              </Button> */}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CheckOutPages;
