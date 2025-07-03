import Button from "$/common/button/button";
import Footer from "../../footer";
import Header from "../../header";
import ModalLogin from "../../modal/login";
import { useOrderProductDB } from "$/modules/Storefont/hooks/dashboard/userOrderProduct";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { type StoreCart } from "../storeCart";

function OrderProductDashBoard() {
  const {
    setLoaded,
    handleDecrease,
    handleDelete,
    handleIncrease,
    calculatOrder,
    calculatorPrice,
    orderId,
    formatCurrency,
    mergedItems,
    handleCheckOut,
    isModal,
    setIsModal,
  } = useOrderProductDB();

  useEffect(() => {
    let Store: StoreCart = [];
    const findCart = localStorage.getItem("storeCart");
    if (findCart) {
      try {
        const parsedCart: unknown = JSON.parse(findCart);
        if (Array.isArray(parsedCart)) {
          Store = parsedCart;
        } else {
          console.log("No data in localStorage: " + Store);
        }
      } catch (error) {
        console.log("No array " + error);
      }
    }
    setLoaded(Store);
  }, []);
  return (
    <div>
      <Header />
      {mergedItems?.length > 0 ? (
        <div className="max-w-7xl mx-auto md:mt-[8rem] lg:mt-[0px] xl:mt-[0px] px-4 py-8 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {mergedItems?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition duration-200"
                  >
                    {/* Product Info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                      <img
                        src={item.image || ""}
                        alt={item.name || "Product Image"}
                        className="w-[80px] h-[80px] p-1 lg:w-[200px] lg:h-[150px] sm:w-[150px] sm:h-[100px] rounded-xl shadow-md"
                      />
                      <div className="flex flex-col">
                        <h2 className="text-base md:text-[18px] lg:text-2xl sm:text-lg font-semibold text-gray-800 line-clamp-1">
                          {item.name}
                        </h2>
                        <p className="text-[16px] md:text-[18px] lg:text-lg text-gray-600 mt-1">
                          Price:{" "}
                          <span className="font-medium md:text-[18px] lg:text-lg text-[#e4002b]">{item.price} đ</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 cursor-pointer flex items-center gap-4 flex-wrap">
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button
                          onClick={() => handleDecrease(item.name)}
                          className="w-8 h-8 cursor-pointer text-lg text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-base font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item.name)}
                          className="w-8 h-8 text-lg text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleDelete(item.name)}
                        className="bg-red-500 lg:text-lg cursor-pointer hover:bg-red-600 text-white px-4 py-1 rounded-md text-[16px]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-lg shadow-2xl min-h-full p-10 h-fit">
              <h2 className="text-xl font-bold mb-4 text-red-500 font-bold"> {orderId} Food</h2>
              <div className="mb-4">
                <p className="text-[16px] font-medium mb-1">Do you have a discount code?</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="🎁 Tip: Enter code to get 10% off orders over 100K!"
                    className="flex-1 text-[16px] border-b border-gray-400 focus:outline-none focus:border-black"
                  />
                  <Button className="bg-black text-[16px] text-white px-4 py-1 rounded-full text-sm" text="Apply" />
                </div>
              </div>
              <div className="border-t border-gray-300 pt-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-[16px]">Total Quantity</span>
                  <span className="text-[16px] text-red-500 font-bold">{calculatOrder} quantity</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Total payment</span>
                  <span className="text-red-500 font-bold">{formatCurrency(calculatorPrice)} đ</span>
                </div>
              </div>
              <Button
                onClick={handleCheckOut}
                text={`CHECK OUT`}
                className="cursor-pointer text-[16px] md:text-[18px] lg:text-[20px] xl:text-[20px] mt-6 w-full font-black bg-red-600 text-white text-lg py-3 rounded-full shadow hover:bg-red-700"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-25 md:pt-[10rem] lg:py-10 bg-[#fbf9f7]">
          <img
            src="https://static.kfcvietnam.com.vn/images/web/empty-cart.png?v=5.0"
            className="mx-auto lg:mx-auto lg:w-70 lg:h-70 w-40 h-40 mb-4 mr-[7rem] md:mr-[18rem] lg:mr-[20rem] xl:mr-[36rem]"
          />
          <p className="text-gray-600 text-xl mb-4 font-semibold lg:text-2xl">No product order</p>
          <NavLink
            to="/menu"
            className="inline-block bg-red-600 text-white px-6 py-3 lg:text-xl rounded-full lg:mb-2 hover:bg-red-700 transition"
          >
            Start order
          </NavLink>
        </div>
      )}
      {isModal && <ModalLogin isModal={isModal} setIsModal={setIsModal} />}
      <Footer />
    </div>
  );
}

export default OrderProductDashBoard;
