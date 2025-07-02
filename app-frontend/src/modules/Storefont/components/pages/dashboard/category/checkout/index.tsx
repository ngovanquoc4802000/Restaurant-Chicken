import Button from "$/common/button/button";
import InputValue from "$/common/input";
import TextareaValue from "$/common/textarea";
import { useProductDetailPages } from "$/modules/Storefont/hooks/menu_page/useProductDetailPages";
import type { DishTs } from "$/modules/Storefont/mockup/dishlist";
import { useCallback, useEffect, useState } from "react";
import Footer from "../../footer";
import Header from "../../header";
import type { CartTs } from "../storeCart";

const mergeCartItems = (cart: CartTs[]): CartTs[] => {
  const mergedItemsMap = new Map<number, CartTs>();
  cart.forEach((item) => {
    const existing = mergedItemsMap.get(item.id);
    if (existing) {
      mergedItemsMap.set(item.id, { ...existing, quantity: existing.quantity + item.quantity });
    } else {
      // Thêm item mới vào map
      mergedItemsMap.set(item.id, { ...item });
    }
  });
  return Array.from(mergedItemsMap.values());
};

function CheckOutPages() {
  const {
    isLoading,
    error,
    dishlist,
    orderData,
    orderDetails,
    isError,
    isSuccess,
    handleCart,
    handleInputChange,
    handleNoteChange,
  } = useProductDetailPages();
  const [loaded, setLoaded] = useState<CartTs[]>([]);

  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  useEffect(() => {
    const findCart = localStorage.getItem("storeCart");
    if (findCart) {
      try {
        const parsedCart: unknown = JSON.parse(findCart);
        if (Array.isArray(parsedCart)) {
          setLoaded(mergeCartItems(parsedCart as CartTs[]));
        } else {
          console.log("No data in localStorage: " + parsedCart);
        }
      } catch (error) {
        console.log("No array " + error);
      }
    }
  }, []);
  const mergedItems = loaded;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const calculatorPrice = mergedItems.reduce((sum, acc) => sum + acc.price * acc.quantity * 1000, 0);

  const calculateOrder = mergedItems.reduce((sum, acc) => sum + acc.quantity, 0);

  const orderId = mergedItems.reduce((sum, acc) => sum + acc.id, 0);

  const EightNameOrder = dishlist?.filter((item) => item.name.startsWith("Salad") || item.name.startsWith("Pepsi"));

  const handleIncrease = useCallback(
    (name: string) => {
      const updatedCart = loaded.map((item) => (item.name === name ? { ...item, quantity: item.quantity + 1 } : item));

      localStorage.setItem("storeCart", JSON.stringify(updatedCart));
      setLoaded(updatedCart);
    },
    [loaded]
  );

  const handleDecrease = useCallback(
    (name: string) => {
      const updateDecrease = loaded.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      );
      setLoaded(updateDecrease);
      localStorage.setItem("storeCart", JSON.stringify(updateDecrease));
    },
    [loaded]
  );
  const handleClickEightOrder = useCallback((itemToAdd: DishTs) => {
    setLoaded((prevCart) => {
      const isCheckLoaded = prevCart.findIndex((item) => item.id === itemToAdd.id);
      let updatedCart;
      if (isCheckLoaded > -1) {
        updatedCart = prevCart.map((cartItem, index) =>
          index === isCheckLoaded ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        const newCartEight: CartTs = {
          image: itemToAdd?.images?.[0].image,
          name: itemToAdd.name,
          price: itemToAdd.price,
          quantity: 1,
          note: "",
          id: 1,
        };
        updatedCart = [...prevCart, newCartEight];
      }
      localStorage.setItem("storeCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  if (isLoading || !dishlist) return <div>Loading...</div>;

  if (error) return `Error Product Details ${error}`;

  return (
    <div className="productDetail-container cursor-pointer">
      {isSuccess && <div>Success...</div>}

      {isError && <div>Error...</div>}

      <Header />
      <main className="flex-grow container mx-auto mt-10 mb-8 px-4 sm:px-6 lg:px-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
          <div className="lg:col-span-2 md:col-span-1 md:mt-30 lg:mt-[-1rem] space-y-6">
            <h1 className="text-3xl mt-[2rem] lg:flex font-bold mb-6">My Shopping Cart</h1>
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
              {mergedItems.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Giỏ hàng của bạn đang trống.</p>
              ) : (
                <div className="space-y-4">
                  {mergedItems.map((item) => (
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-lg bg-white border border-gray-200">
                      <img
                        src={item.image ?? ""}
                        alt={item.name}
                        className="xl:w-40 xl:h-32 lg:w-40 lg:h-32 md:w-32 md:h-32 w-[300px] h-300px object-cover rounded-md shadow-sm flex-shrink-0"
                      />
                      <div className="flex-1 w-full text-center sm:text-left">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">Price: {item.price}</p>
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
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-800 text-white rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl md:text-2xl font-extrabold mb-6 border-b border-gray-600 pb-4">
                MORE DELICIOUS WHEN ENJOYED WITH...
              </h2>
              <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:px-0 sm:-mx-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
                {EightNameOrder?.map((item) => (
                  <div
                    onClick={() => handleClickEightOrder(item)}
                    key={item.id}
                    className="flex-shrink-0 w-32 sm:w-40 md:w-48 mr-4 last:mr-0 flex flex-col items-center p-3 rounded-lg bg-gray-700 shadow-md transform hover:scale-105 transition duration-200"
                  >
                    <img src={item.images?.[0]?.image} className="w-36 h-36 object-cover rounded-md mb-2" />
                    <p className="text-sm font-semibold text-center leading-tight mb-1">
                      {item.name.length > 24 ? item.name.substring(0, 24) + "..." : item.name}
                      {""}
                    </p>
                    <p className="text-red-400 text-md font-bold">{item.price.toLocaleString("vi-VN")}₫</p>
                    <button className="mt-2 bg-red-600 w-full hover:bg-red-700 text-white px-3 py-3 rounded-full text-xs font-semibold shadow-md">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 md:col-span-1 lg:w-[320px]  lg:mt-10 w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-3">{orderId} MÓN</h3>

            <div className="space-y-2 text-gray-800 font-semibold text-base">
              <div className="flex justify-between">
                <span>Total Order: </span>
                <span className="text-red-600 font-bold">{calculateOrder} order</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping fee: </span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex hover:bg-gray-100  rounded-md justify-between text-xl lg:focus: font-bold border-t pt-3 mt-3">
                <span>Total Payment:</span>
                <span className="text-red-600">{`${formatCurrency(calculatorPrice)} đ`}</span>
              </div>
            </div>

            <form onSubmit={handleCart} className={`space-y-4 pt-4 border-t ${showDeliveryForm ? "block" : "hidden"}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Delivery information</h3>
                <button
                  type="button"
                  onClick={() => setShowDeliveryForm(false)}
                  className="text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
                  aria-label="Close delivery form"
                >
                  &times;
                </button>
              </div>
              <InputValue
                text="Delivery address"
                placeholder="Address..."
                type="text"
                classNameLabel="block font-semibold text-gray-700"
                classNameInput="w-full border p-1 rounded-md border-gray-800"
                name="address"
                value={orderData.address}
                onChange={handleInputChange}
              />
              <InputValue
                text="Fullname"
                placeholder="Customer name..."
                type="text"
                name="customer_name"
                classNameLabel="block font-semibold text-gray-700"
                classNameInput="w-full border p-1 rounded-md border-gray-800"
                onChange={handleInputChange}
                value={orderData.customer_name}
              />
              <InputValue
                text="Telephone"
                placeholder="Customer phone number..."
                type="tel"
                name="customer_phone"
                classNameLabel="block font-semibold text-gray-700"
                classNameInput="w-full border p-1 rounded-md border-gray-800"
                onChange={handleInputChange}
                value={orderData.customer_phone}
              />
              <TextareaValue
                text="Order Note"
                placeholder="customer note order..."
                name="customer_note"
                value={orderData.customer_note}
                onChange={handleInputChange}
                classNameLabel="block font-semibold text-gray-700"
                classNameInput="w-full border p-1 rounded-md border-gray-800"
              />
              <InputValue
                text="Notes"
                placeholder="Notes..."
                type="text"
                name="note"
                classNameLabel="block font-semibold text-gray-700"
                classNameInput="w-full border border-gray-800 p-1 rounded-md"
                onChange={handleNoteChange}
                value={orderDetails.note}
              />

              <Button
                type="submit"
                text="Payment"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 md:py-4 rounded-full transition-colors duration-300 shadow-md text-lg"
              />
            </form>
            <div className="flex justify-center">
              <svg
                onClick={() => setShowDeliveryForm(!showDeliveryForm)}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  showDeliveryForm ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CheckOutPages;
