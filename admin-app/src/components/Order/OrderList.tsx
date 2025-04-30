import { useEffect, useState } from "react";
import { getOrderAll } from "../../services/order";
import { OrderDetailsTs, OrderTableTs } from "../../types/order";
import Button from "../button/button";
import CreateOrderForm from "./createOrder";
import "./OrderList.scss";

const OrderList = () => {
  const [orderList, setOrderList] = useState<OrderTableTs[]>([]);

  const [details, setDetails] = useState<OrderDetailsTs[] | undefined>(undefined);

  const [showOrder, setShowOrder] = useState<boolean>(false);

  const [showForm, setShowForm] = useState<boolean>(false);

  const [orderData, setOrderData] = useState<OrderTableTs>({
    user_id: 0, // sẽ ẩn đi
    address: "",
    customer_note: "",
    customer_name: "",
    customer_phone: "",
    details: [],
    create_at: new Date(),
  });
  const [orderDetails, setOrderDetails] = useState<OrderDetailsTs>({
    id_dishlist: 0,
    quantity: 0,
    price: 0,
    note: "",
  });

  useEffect(() => {
    const apiOrder = async () => {
      try {
        const { data } = await getOrderAll();
        setOrderList(data);
      } catch (error) {
        console.log(error);
      }
    };
    apiOrder();
  }, []);

  const handleDetails = (orderDetail: OrderDetailsTs[]) => {
    setDetails(orderDetail || []);
    setShowOrder(true);
  };

  const onClose = () => {
    setShowOrder(false);

    setOrderData({
      user_id: 0,
      address: "",
      customer_note: "",
      customer_name: "",
      customer_phone: "",
      details: [],
      create_at: new Date(),
    });

    setOrderDetails({
      id_dishlist: 0,
      quantity: 0,
      price: 0,
      note: "",
    });
  };

  const handleCreate = () => {
    setShowForm(!showForm);
  };

  const handleEditOrder = (id: number | undefined) => {
    const orderFind = orderList.find((item) => item.id === id);
    if (orderFind) {
      setOrderData({
        user_id: orderFind.user_id,
        address: orderFind.address,
        customer_name: orderFind.customer_name,
        customer_note: orderFind.customer_note,
        customer_phone: orderFind.customer_phone,
        details: orderFind.details,
        create_at: orderFind.create_at,
      });
    }
    setShowForm(true);
  };

  return (
    <div className="order-list">
      <h2 style={{ textAlign: "center", fontSize: "20px" }}>Order List</h2>
      <Button action="create" onClick={handleCreate} />
      {showForm && (
        <CreateOrderForm
          orderData={orderData}
          orderDetails={orderDetails}
          setOrderData={setOrderData}
          setOrderDetails={setOrderDetails}
          setOrderList={setOrderList}
          onClose={onClose}
        />
      )}
      {showOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Order Details</h2>
            {details?.map(({ note, price, id_dishlist, quantity }, index) => (
              <div className="modal-details" key={index}>
                <p>Dishlist: {id_dishlist}</p>
                <p>Quantity: {quantity}</p>
                <p>Price: {price}</p>
                <p>Note: {note}</p>
              </div>
            ))}
            <button onClick={onClose}>Close</button>
          </div>
        </div>
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
            <th>Status</th>
            <th>Paid</th>
            <th>Create_at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((item, index) => (
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
                <Button action="showDetails" onClick={() => handleDetails(item.details)} />
                <Button action="edit" onClick={() => handleEditOrder(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orderList.length === 0 && <p>No orders found.</p>}
    </div>
  );
};

export default OrderList;
