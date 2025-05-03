import { useQuery } from "@tanstack/react-query";
import queriesOrder from "../../queries/orders";
import Button from "../button/button";
import { useState } from "react";
import OrderDetails from "./orderDetail";
import queriesUser from "../../queries/users";
import { OrderDetailsTs } from "../../types/order";
import OrderForm from "./orderForm";

const Order = () => {
  const [showOrder, setShowOrder] = useState<boolean>(false);

  const [showForm, setShowForm] = useState<boolean>(false);

  const [selectedDetails, setSelectedDetails] = useState<OrderDetailsTs[] | null>(null);

  const { isLoading, isError, data: orderList } = useQuery({ ...queriesOrder.list });

  const { data: userName } = useQuery({ ...queriesUser.list });

  if (isLoading || !orderList || !userName) return <div>Loading...</div>;

  if (isError) return <div>Error...</div>;

  const findUserName = (id: number) => {
    const find = userName.find((item) => item.id === id);
    return find ? find.fullname : "undefined";
  };

  const handleDetails = (item: OrderDetailsTs[]) => {
    setSelectedDetails(item);
    setShowOrder(true);
  };

  return (
    <div className="order-list">
      <h2 style={{ textAlign: "center", fontSize: "20px" }}>Order List</h2>
      {isLoading && <h2>Loading...</h2>}
      <Button action="create" onClick={() => setShowForm(true)} />
      {showForm && <OrderForm onHideModal={() => setShowForm(false)} />}
      {showOrder && selectedDetails && <OrderDetails item={selectedDetails} onHideModal={() => setShowOrder(false)} />}
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
            <th>Status</th>
            <th>Paid</th>
            <th>Create_at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList?.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{findUserName(item.user_id)}</td>
              <td>{item.address}</td>
              <td>{item.customer_name}</td>
              <td>{item.customer_phone}</td>
              <td>{item.customer_note}</td>
              <td>{item.total_price}</td>
              <td>{item.status ? "Hoàn thành" : "Đang xử lý"}</td>
              <td>{item.paid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
              <td></td>
              <td>
                <Button action="showDetails" onClick={() => handleDetails(item.details)} />
                <Button action="edit" /* onClick={() => handleEditOrder(item.id)} */ />
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
