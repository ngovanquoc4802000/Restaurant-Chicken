import Button from "$/common/button/button";
import { getUserAll } from "$/modules/Admin/services/users";
import { useOrderProductDB } from "$/modules/Storefont/hooks/dashboard/userOrderProduct";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../footer";
import Header from "../../header";
import { type StoreCart } from "../storeCart";
import { useSelector } from "react-redux";
import type { RootState } from "$/modules/Storefont/store/store";
import ModalLogin from "../../modal/login";

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
  const [isModal, setIsModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const emailRedux : string | null = useSelector(
    (state: RootState) => state.userLogin.email
  );
  console.log(emailRedux);
  const handleCheckOut = async () => {
    try {
      const getAllUser = await getUserAll();
      if (!getAllUser?.data) {
        console.log("Không lấy được danh sách người dùng");
        setIsModal(true);
        return;
      }
      const emailExists = getAllUser.data.some((user) => user.email === emailRedux);
      if (emailExists) {
        navigate("/checkout");
        console.log("Get Email Completed")
      } else {
        console.log("No find Email")
        setIsModal(true);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra email:", error);
      setIsModal(true);
    }
  };
  return (
    <div>
      <Header />
      {mergedItems?.length > 0 ? (
        <div className="max-w-7xl mx-auto md:mt-[8rem] lg:mt-[0px] xl:mt-[0px] px-4 py-8 mt-16">
          <h1 className="text-3xl lg:flex font-bold mb-6">My Shopping Cart</h1>
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
                          <span className="font-medium md:text-[18px] lg:text-lg text-[#e4002b]">
                            {item.price} đ
                          </span>
                        </p>
                        <p className="text-[16px] md:text-[18px] lg:text-lg text-gray-600">
                          Note: {item.note}
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="mt-4 md:mt-0 cursor-pointer flex items-center gap-4 flex-wrap">
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button
                          onClick={() => handleDecrease(item.name)}
                          className="w-8 h-8 cursor-pointer text-lg text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-base font-semibold">
                          {item.quantity}
                        </span>
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

            {/* Right side - Payment Summary */}
            <div className="bg-white rounded-lg shadow-2xl min-h-full p-10 h-fit">
              <h2 className="text-xl font-bold mb-4"> {orderId} Food</h2>
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">
                  Do you have a discount code?
                </p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="🎁 Tip: Enter code to get 10% off orders over 100K!"
                    className="flex-1 border-b border-gray-400 focus:outline-none focus:border-black"
                  />
                  <Button
                    className="bg-black text-white px-4 py-1 rounded-full text-sm"
                    text="Apply"
                  />
                </div>
              </div>
              <div className="border-t border-gray-300 pt-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Total Quantity</span>
                  <span>{calculatOrder} quantity</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Total payment</span>
                  <span>{formatCurrency(calculatorPrice)} đ</span>
                </div>
              </div>
              <Button
                onClick={handleCheckOut}
                text={`CHECK OUT ${formatCurrency(calculatorPrice)} đ`}
                className="cursor-pointer mt-6 w-full font-black bg-red-600 text-white text-lg py-3 rounded-full shadow hover:bg-red-700"
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
          <p className="text-gray-600 text-xl mb-4 font-semibold lg:text-2xl">
            No product order
          </p>
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
