import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { OrderDetailsTs } from "../../types/order";
import OrderDetails from "./orderDetail";
import queriesOrder from "../../queries/orders";
import queriesUser from "../../queries/users";
import OrderForm from "./orderForm";
import Button from "../common/button/button";

interface OrderStateTs {
  showOrder: boolean;
  showForm: boolean;
  selectedDetails: OrderDetailsTs[] | null;
  idDetail: number | undefined | null;
  currentStep: string;
}
const initialOrderTs: OrderStateTs = {
  showOrder: false,
  showForm: false,
  selectedDetails: null,
  idDetail: null,
  currentStep: "",
};

const Order = () => {
  const [stateOrder, setStateOrder] = useState<OrderStateTs>(initialOrderTs);

  const { isLoading, isError, data: orderList } = useQuery({ ...queriesOrder.list });

  const { data: userName } = useQuery({ ...queriesUser.list });

  const findUserMap = useMemo(() => {
    const map = new Map();
    userName?.forEach((cat) => map.set(cat.id, cat.fullname));
    return map;
  }, [userName]);

  const getFindUser = useCallback((id: string | number) => findUserMap.get(id) || "undefined", [findUserMap]);

  const handleDetails = useCallback((item: OrderDetailsTs[], id: number | null | undefined, process: string) => {
    setStateOrder((prev) => ({ ...prev, selectedDetails: item, idDetail: id, currentStep: process, showOrder: true }));
  }, []);

  const handleEditOrder = useCallback((id: number | undefined | null) => {
    setStateOrder((prev) => ({ ...prev, idDetail: id, showForm: true }));
  }, []);

  const handleHideDetail = useCallback(() => {
    setStateOrder((prev) => ({ ...prev, showForm: false, selectedDetails: null, idDetail: null }));
  }, []);

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
          {orderList?.map((item, index) => (
            <tr key={index}>
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
