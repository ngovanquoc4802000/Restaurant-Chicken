import Button from "../../../../common/button/button";
import { useOrder } from "../../hooks/useOrder";
import OrderDetails from "./orderDetail";
import OrderForm from "./orderForm";

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

  if (isLoading || !orderList || !userName) return <div>Loading...</div>;

  if (isError) return <div>Error...</div>;

  return (
    <div className="order-list">
      <h2 style={{ textAlign: "center", fontSize: "20px" }}>Order List</h2>

      <Button action="create" onClick={() => setStateOrder((prev) => ({ ...prev, showForm: true }))} />

      {stateOrder.showForm && <OrderForm idDetail={stateOrder.idDetail} onHideModal={handleHideDetail} />}

      {stateOrder.showOrder && stateOrder.selectedDetails && (
        <OrderDetails
          item={stateOrder.selectedDetails}
          onHideModal={() => setStateOrder((prev) => ({ ...prev, showOrder: false }))}
          orderId={stateOrder.idDetail}
          currentStep={stateOrder.currentStep}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Address</th>
            <th>Customer_name</th>
            <th>Customer_phone</th>
            <th>Customer_note</th>
            <th>Total Price</th>
            <th>Process</th>
            <th>Paid</th>
            <th>Create_at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{getFindUser(item.user_id)}</td>
              <td>{item.address}</td>
              <td>{item.customer_name}</td>
              <td>{item.customer_phone}</td>
              <td>{item.customer_note}</td>
              <td>{item.total_price}</td>
              <td>{item.process || "Chưa xác định"}</td>
              <td>{item.paid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
              <td>{new Date(item.create_at).toLocaleString()}</td>
              <td>
                <Button action="showDetails" onClick={() => handleDetails(item.details, item.id, item.process || "")} />
                <Button action="edit" onClick={() => handleEditOrder(item.id)} />
                {item.process === "Hoàn thành" ? (
                  <button
                    style={{
                      background: "#6c757d",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "not-allowed",
                    }}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
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
  );
};

export default Order;
