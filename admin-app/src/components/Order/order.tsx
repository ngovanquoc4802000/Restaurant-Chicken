import { useQuery } from "@tanstack/react-query";
import queriesOrder from "../../queries/orders";
import Button from "../button/button";
import { useState } from "react";
import OrderDetails from "./orderDetail";

const Order = () => {
  const [showOrder, _] = useState<boolean>(false);

  const { isLoading, isError, data: orderList } = useQuery({ ...queriesOrder.list });
  if (isLoading || !orderList) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="order-list">
      <h2 style={{ textAlign: "center", fontSize: "20px" }}>Order List</h2>
      {isLoading && <h2>Loading...</h2>}
      <Button action="create" />
      {showOrder && orderList.map((item) => <OrderDetails item={item.details} />)}
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
              <td>{item.user_id}</td>
              <td>{item.address}</td>
              <td>{item.customer_name}</td>
              <td>{item.customer_phone}</td>
              <td>{item.customer_note}</td>
              <td>{item.total_price}</td>
              <td>{item.status ? "Hoàn thành" : "Đang xử lý"}</td>
              <td>{item.paid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
              <td></td>
              <td>
                <Button action="showDetails" /* onClick={() => handleDetails(item.details)}  */ />
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
