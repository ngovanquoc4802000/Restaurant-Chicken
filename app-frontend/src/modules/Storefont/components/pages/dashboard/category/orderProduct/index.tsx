/* eslint-disable react-hooks/rules-of-hooks */
import Button from "$/common/button/button";
import { useOrderProductDB } from "$/modules/Storefont/hooks/dashboard/userOrderProduct";
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../footer";
import Header from "../../header";
import { type CartTs, type StoreCart } from "../storeCart";

function orderProductDashBoard() {
  const { isError, isLoading, isErrorDishlist, isLoadingDishlist, orderList } =
    useOrderProductDB();
  const [loaded, setLoaded] = useState<CartTs[]>([]);

  useEffect(() => {
    let Store: StoreCart = [];
    const findCart = localStorage.getItem("storeCart");
    if (findCart) {
      try {
        const parsedCart: unknown = JSON.parse(findCart);
        if (Array.isArray(parsedCart)) {
          Store = parsedCart;
        } else {
          console.log("không có dữ liệu từ localStorage: " + Store);
        }
      } catch (error) {
        console.log("không có array " + error);
      }
    }
    setLoaded(Store);
  }, []);
  const mergedItemsMap = new Map<string, CartTs>();

  loaded.forEach((item) => {
    const existing = mergedItemsMap.get(item.name);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      mergedItemsMap.set(item.name, { ...item });
    }
  });

  const mergedItems = Array.from(mergedItemsMap.values());
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const calculatorPrice = mergedItems.reduce(
    (sum, acc) => sum + acc.price * acc.quantity * 1000,
    0
  );
  const calculatOrder = mergedItems.reduce((sum, acc) => sum + acc.quantity, 0);
  const orderId = mergedItems.reduce((sum, acc) => sum + acc.id, 0);

  const handleIncrease = useCallback(
    (name: string) => {
      const updatedCart = loaded.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      );

      setLoaded(updatedCart);
      localStorage.setItem("storeCart", JSON.stringify(updatedCart));
    },
    [loaded]
  );

  const handleDecrease = useCallback(
    (name: string) => {
       const updateDecrease = loaded.map((item) => 
       item.name === name ? {
        ...item, quantity: Math.max(1,item.quantity - 1) 
       } : item
      )
    setLoaded(updateDecrease);
    localStorage.setItem("storeCart",JSON.stringify(updateDecrease))
    },[loaded])
 
  if (isLoadingDishlist && isLoading && !orderList)
    return <div>Loading...</div>;

  if (isError && isErrorDishlist) return <div>Error...</div>;

  return (
    <div>
      <Header />
      {mergedItems?.length > 0 ? (
        <div className="max-w-7xl mx-auto md:mt-[6rem] lg:mt-[0px] xl:mt-[0px] px-4 py-8 mt-16">
          <h1 className="text-3xl lg:flex font-bold mb-6">My Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {mergedItems?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="md:flex justify-between border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition duration-200"
                  >
                    <div className="flex">
                      <img
                        src={item.image || ""}
                        alt={item.name || "This is Product Image"}
                        className="w-[100px] h-[100px] object-cover rounded-xl shadow-md p-2"
                      />
                      <div className="ml-3">
                        <h2 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h2>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-gray-600">Price: {item.price} đ</p>
                        <p className="text-gray-600">Notes: {item.note}</p>
                        <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                          <div className="flex items-center space-x-4">
                            <button 
                            onClick={() => handleDecrease(item.name)}
                            className="w-10 h-10 border rounded-full flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100">
                              −
                            </button>
                            <span className="text-lg font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrease(item.name)}
                              className="w-10 h-10 border rounded-full flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <p
                        className="text-red-500 cursor-pointer"
                        /*   onClick={() => handleRemove(details.id_dishlist)} */
                      >
                        Delete
                      </p>
                      <NavLink to="/menu">
                        <p className="text-red-500">Edit</p>
                      </NavLink>
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
                  <span>Total Order</span>
                  <span>{calculatOrder} order</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Total payment</span>
                  <span>{formatCurrency(calculatorPrice)} đ</span>
                </div>
              </div>
              <Button
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
      <Footer />
    </div>
  );
}

export default orderProductDashBoard;
