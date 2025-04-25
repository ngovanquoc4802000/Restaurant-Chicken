import { useEffect, useState } from "react";
import { createOrder, getOrderAll } from "../../services/order";
import { CreateOrderPayload, OrderDetailsTs, OrderTableTs } from "../../types/order";
import Button from "../button/button";
import "./OrderList.css";

const OrderList = () => {
  const [orderList, setOrderList] = useState<OrderTableTs[]>([]);

  const [details, setDetails] = useState<OrderDetailsTs[] | undefined>(undefined);

  const [showOrder, setShowOrder] = useState<boolean>(false);

  const [showForm, setShowForm] = useState<boolean>(false);

  const [orderData, setOrderData] = useState<OrderTableTs>({
    user_id: 0,
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
  const handleSubmitOrder = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (orderData.user_id <= 0) {
      alert("Vui lòng nhập ID người dùng hợp lệ (> 0).");
      return;
    }
    if (!orderData.customer_name || !orderData.customer_phone || !orderData.address) {
      alert("Vui lòng điền đầy đủ thông tin khách hàng (Tên, SĐT, Địa chỉ).");
      return;
    }
    if (orderData.details.length === 0) {
      alert("Đơn hàng chưa có món nào. Vui lòng thêm ít nhất một món.");
      return;
    }
    const orderPayload: CreateOrderPayload = {
      user_id: orderData.user_id,
      address: orderData.address,
      customer_note: orderData.customer_note,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      // Dùng orderData.details nhưng gửi dưới key là 'list_order'
      list_order: orderData.details,
      // Không gửi các trường khác như total_price, status, paid, create_at
    };
    try {
      const createdOrderData = await createOrder(orderPayload);
      console.log("Order created successfully:", createdOrderData);
      if (createdOrderData) {
        const { data } = await getOrderAll();
        setOrderList(data);
      }
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
      onClose();
    } catch (error) {
      console.log(error);
      alert("Có lỗi xảy ra khi tạo đơn hàng");
    }
  };
  const handleAddItem = () => {
    if (orderDetails.id_dishlist <= 0 || orderDetails.quantity <= 0 || orderDetails.price < 0) {
      alert("Vui lòng nhập đủ thông tin món ăn hợp lệ (ID Món > 0, Số lượng > 0, Giá >= 0).");
      return;
    }

    setOrderData({
      ...orderData,
      details: [...orderData.details, orderDetails],
    });

    setOrderDetails({
      id_dishlist: 0,
      quantity: 0,
      price: 0,
      note: "",
    });
  };
  const handleOrderInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "user_id") {
      const numValue = Number(value);
      setOrderData({ ...orderData, [name]: isNaN(numValue) ? 0 : numValue });
    } else {
      setOrderData({ ...orderData, [name]: value });
    }
  };

  const handleOrderInputDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "id_dishlist" || name === "quantity" || name === "price") {
      const numValue = Number(value);
      setOrderDetails({ ...orderDetails, [name]: isNaN(numValue) ? 0 : numValue });
    } else {
      setOrderDetails({ ...orderDetails, [name]: value });
    }
  };
  const handleCreate = () => {
    setShowForm(!showForm);
  };
  return (
    <div className="order-list">
      <h2 style={{ textAlign: "center", fontSize: "20px" }}>Order List</h2>
      <Button action="create" onClick={handleCreate} />
      {showForm && (
        <form
          onSubmit={handleSubmitOrder}
          className="create-order-form"
          style={{
            position: "absolute",
            maxWidth: "600px",
            margin: "auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            zIndex: 999,
            backgroundColor: "#303f9f",
            color: "#fff",
            left: "25%",
            top: "5%",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>Tạo Đơn Hàng Mới</h2>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ marginBottom: "10px" }}>Thông tin khách hàng</h3>
            <input
              type="number"
              name="user_id"
              value={orderData.user_id}
              onChange={handleOrderInputChange}
              style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={orderData.address || ""}
                onChange={handleOrderInputChange}
                style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Ghi chú khách hàng:</label>
              <textarea
                name="customer_note"
                value={orderData.customer_note || ""}
                onChange={handleOrderInputChange}
                style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Tên khách hàng:</label>
              <input
                type="text"
                name="customer_name"
                value={orderData.customer_name || ""}
                onChange={handleOrderInputChange}
                style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Số điện thoại:</label>
              <input
                type="text"
                name="customer_phone"
                value={orderData.customer_phone || ""}
                onChange={handleOrderInputChange}
                style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
          </div>
          {/* Form thêm chi tiết món ăn */}
          <div style={{ marginBottom: "20px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
            <h3 style={{ marginBottom: "10px" }}>Thêm món ăn</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "10px", marginBottom: "10px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>ID Món:</label>
                <input
                  type="number"
                  name="id_dishlist"
                  value={Number(orderDetails.id_dishlist)}
                  onChange={handleOrderInputDetails}
                  style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>Số lượng:</label>
                <input
                  type="number"
                  name="quantity"
                  value={Number(orderDetails.quantity)}
                  onChange={handleOrderInputDetails}
                  style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>Giá:</label>
                <input
                  type="number"
                  name="price"
                  value={Number(orderDetails.price)}
                  onChange={handleOrderInputDetails}
                  style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div style={{ alignSelf: "flex- end" }}>
                <button
                  onClick={handleAddItem}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Thêm
                </button>
              </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Ghi chú món ăn:</label>
              <input
                type="text"
                name="note"
                value={orderDetails.note}
                onChange={handleOrderInputDetails}
                style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
          </div>
          {/* Danh sách các món đã thêm */}
          <div style={{ marginBottom: "20px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
            <h3 style={{ marginBottom: "10px" }}>Chi tiết đơn hàng ({orderData.details.length} món)</h3>
            {orderData.details.length === 0 ? (
              <p>Chưa có món nào được thêm.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {orderData.details.map((item, index) => (
                  <li key={index} style={{ borderBottom: "1px dashed #eee", paddingBottom: "10px", marginBottom: "10px" }}>
                    Món {index + 1}: ID {item.id_dishlist}, SL {item.quantity}, Giá {item.price} - Ghi chú: {item.note || "Không"}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "revert-layer",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Tạo Đơn Hàng
          </button>
        </form>
      )}
      {showOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Order Details</h2>
            {details?.map(({ note, price, id_dishlist, quantity }) => (
              <div className="modal-details">
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
              <td>
                {new Intl.DateTimeFormat("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                  timeZone: "Asia/Ho_Chi_Minh",
                }).format(new Date(item.create_at))}
              </td>
              <td>
                <Button action="showDetails" onClick={() => handleDetails(item.details)} />
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
