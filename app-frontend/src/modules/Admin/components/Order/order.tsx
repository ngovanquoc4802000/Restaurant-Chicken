import Button from "$/common/button/button";
import { useSelector } from "react-redux";
import { useOrder } from "../../hooks/useOrder";
import OrderDetails from "./orderDetail";
import OrderForm from "./orderForm";
import type { RootState } from "$/modules/Storefont/store/store";

const Order = () => {
  const {
    getFindUser,
    handleDetails,
    handleEditOrder,
    handleHideDetail,
    isLoading,
    isError,
    stateOrder,
    setStateOrder,
    orderList,
    userName,
  } = useOrder();
  const rule = useSelector((state: RootState) => state.userLogin.rule);
  console.log(rule === "admin")
  
  if (isLoading || !orderList || !userName) return <div>Loading...</div>;

  if (isError) return <div>Error...</div>;
  
  const sortdDish = [...orderList].sort((a,b) => Number(a) - Number(b))
  return (
    <div className="order-list  rounded-[5px] relative">
      <h2 className="text-center text-2xl bg-[#dc3545] p-5 text-white font-bold text-gray-700 mt-0 mb-5">Order List</h2>
    <div className="p-5">
      <Button
      className="px-[8px] cursor-pointer py-[10px] bg-green-600 text-white rounded-[4px]"
        text="+ Create"
        onClick={() => setStateOrder((prev) => ({ ...prev, showForm: true }))}
      />

      {stateOrder.showForm && (
        <OrderForm
          idDetail={stateOrder.idDetail}
          onHideModal={handleHideDetail}
        />
      )}

      {stateOrder.showOrder && stateOrder.selectedDetails && (
        <OrderDetails
          item={stateOrder.selectedDetails}
          onHideModal={() =>
            setStateOrder((prev) => ({ ...prev, showOrder: false }))
          }
          orderId={stateOrder.idDetail}
          currentStep={stateOrder.currentStep}
        />
      )}

      <table className="w-full border-collapse mt-2">
        <thead>
          <tr>
            <th className="bg-[#dc3545] text-white font-bold border border-solid border-gray-500 p-2.5 text-left">Id</th>
            <th className="bg-[#dc3545] text-white font-bold border border-solid border-gray-500 p-2.5 text-left">User</th>
            <th className="bg-[#dc3545] text-white font-bold border border-solid border-gray-500 p-2.5 text-left">Address</th>
            <th className="bg-[#dc3545] text-white font-bold border border-solid border-gray-500 p-2.5 text-left">Customer_name</th>
            <th className="bg-[#dc3545] text-white font-bold border border-solid border-gray-500 p-2.5 text-left">Customer_phone</th>
            <th className="bg-[#dc3545] text-white font-bold border border-solid border-gray-500 p-2.5 text-left">Customer_note</th>
            <th className="bg-[#dc3545] text-white font-bold border border-solid border-gray-500 p-2.5 text-left">Total Price</th>
            <th className="bg-[#dc3545] text-white font-bold border border-solid border-gray-500 p-2.5 text-left">Process</th>
            <th className="bg-[#dc3545] text-white font-bold border border-solid border-gray-500 p-2.5 text-left">Paid</th>
            <th className="bg-[#dc3545] text-white font-bold border border-solid border-gray-500 p-2.5 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          { sortdDish?.map((item) => (
            <tr key={item.id}>
              <td className=" font-bold border border-solid border-gray-500 p-2.5 text-left">{Number(item.id)}</td>
              <td className=" font-bold border border-solid border-gray-500 p-2.5 text-left">{getFindUser(item.user_id)}</td>
              <td className=" font-bold border border-solid border-gray-500 p-2.5 text-left">{item.address}</td>
              <td className=" font-bold border border-solid border-gray-500 p-2.5 text-left">{item.customer_name}</td>
              <td className=" font-bold border border-solid border-gray-500 p-2.5 text-left">{item.customer_phone}</td>
              <td className=" font-bold border border-solid border-gray-500 p-2.5 text-left">{item.customer_note}</td>
              <td className=" font-bold border border-solid border-gray-500 p-2.5 text-left">{item.total_price} VND</td>
              <td className=" font-bold border border-solid border-gray-500 p-2.5 text-left">{item.process || "Chưa xác định"}</td>
              <td className=" font-bold border border-solid border-gray-500 p-2.5 text-left">{item.paid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
              <td className="font-bold border border-solid border-gray-500 p-2.5 text-left ">
                <Button
                  className="bg-red-600 cursor-pointer text-white px-[37px] py-[10px] rounded-[4px]"
                  text="Show"
                  onClick={() =>
                    handleDetails(item.details, item.id, item.process || "")
                  }
                />
                <Button className="bg-amber-400  cursor-pointer text-[16px] text-white py-[12px] mt-2 mb-2 px-[44px] rounded-[4px]" text="Edit" onClick={() => handleEditOrder(item.id)} />
                {item.process === "Completed" ? (
                  <button
                  className="bg-[#6c757d] text-white border-none px-[14px] mb-0.5 py-[12px] rounded-[4px] cursor-not-allowed"
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                  className="bg-[#dc3545] text-white cursor-pointer border-none px-[14px] mb-0.5 py-[12px] rounded-[4px] cursor-not-allowed"
                  >
                    Deactivated
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orderList.length === 0 && <p>No orders found.</p>}

    </div>
    </div>
  );
};

export default Order;
