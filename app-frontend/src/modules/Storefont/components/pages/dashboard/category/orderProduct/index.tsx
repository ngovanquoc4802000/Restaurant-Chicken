/* eslint-disable react-hooks/rules-of-hooks */
import Button from "$/common/button/button";
import { useOrderProductDB } from "$/modules/Storefont/hooks/dashboard/userOrderProduct";
import queriesDishlist from "$/modules/Storefont/queries/dishlist";
import queriesOrder from "$/modules/Storefont/queries/order";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../footer";
import Header from "../../header";

function orderProductDashBoard() {
  const { sumOrder, rule, userId, handleRemove } = useOrderProductDB();
  const queryClient = useQueryClient();
  console.log(userId);
  const {
    data: orderList,
    isError,
    isLoading,
  } = useQuery({ ...queriesOrder.list });

  console.log(orderList);

  const {
    isError: isErrorDishlist,
    isLoading: isLoadingDishlist,
    data: dishlist,
  } = useQuery({ ...queriesDishlist.list });

  const findUserId = orderList?.filter((item) => item.user_id === userId);

  const totalDishes =
    findUserId?.reduce((acc, curr) => acc + curr.details.length, 0) ?? 0;

  const totalQuantity =
    findUserId?.reduce(
      (acc, curr) =>
        acc + curr.details.reduce((sum, d) => sum + d.quantity * d.price, 0),
      0
    ) ?? 0;

  useEffect(() => {
    if (findUserId && findUserId.length > 0) {
      localStorage.setItem("user_order_history", JSON.stringify(findUserId));
    }
    queryClient.invalidateQueries({ queryKey: queriesOrder.list.queryKey });
    queryClient.refetchQueries({ queryKey: queriesOrder.list.queryKey });
  }, [findUserId, queryClient, userId]);

  const hasOrders =
    orderList &&
    orderList.length > 0 &&
    orderList.some((item) => item.details.length > 0);
  /*   const largerId = findUserId?.map((item) => item.details.length > 0); */

  if (isLoadingDishlist && isLoading && !orderList)
    return <div>Loading...</div>;

  if (isError && isErrorDishlist) return <div>Error...</div>;
  return (
    <div>
      <Header />
      {rule === "customer" && hasOrders ? (
        <div className="max-w-7xl mx-auto md:mt-[6rem] lg:mt-[0px] xl:mt-[0px] px-4 py-8 mt-16">
          <h1 className="text-3xl lg:flex font-bold mb-6">My Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Product List */}
            <div className="lg:col-span-2 space-y-4">
              {findUserId?.map((item) =>
                item.details.map((details) => {
                  const dish = dishlist?.find(
                    (d) => d.id === details.id_dishlist
                  );

                  return (
                    <div
                      key={details.id_dishlist}
                      className="md:flex justify-between border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition duration-200"
                    >
                      <div className="flex">
                        <img
                          src={dish?.images?.[0]?.image || ""}
                          alt={dish?.title || ""}
                          className="w-[100px] h-[100px] object-cover rounded-xl shadow-md p-2"
                        />
                        <div className="ml-3">
                          <h2 className="text-lg font-semibold text-gray-800">
                            {dish?.title}
                          </h2>
                          <p className="text-gray-600">
                            Quantity: {details.quantity}
                          </p>
                          <p className="text-gray-600">
                            Price: {details.price} VND
                          </p>
                          <p className="text-gray-600">Notes: {details.note}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <p
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleRemove(details.id_dishlist)}
                        >
                          Delete
                        </p>
                        <NavLink to="/menu">
                          <p className="text-red-500">Edit</p>
                        </NavLink>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right side - Payment Summary */}
            <div className="bg-white rounded-lg shadow-2xl min-h-full p-10 h-fit">
              <h2 className="text-xl font-bold mb-4"> {totalDishes} dish</h2>
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
                  <span>{sumOrder} order</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Total payment</span>
                  <span>{Number(totalQuantity).toFixed(3)} VND</span>
                </div>
              </div>
              <Button
                text={`Payment ${Number(totalQuantity).toFixed(3)} VND`}
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
