import { useState } from "react";
import { OrderDetailsTs, OrderTableTs } from "../../types/order";
import Button from "../button/button";

interface OrderFormTs {
  onHideModal: () => void;
}

function OrderForm({ onHideModal }: OrderFormTs) {
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

  const handleOrderInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "user_id") {
      const numValue = Number(value);
      setOrderData((prev) => ({
        ...prev,
        [name]: isNaN(numValue) ? 0 : numValue,
      }));
    } else {
      setOrderData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleOrderInputDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "id_dishlist" || name === "quantity" || name === "price") {
      const numValue = Number(value);
      setOrderDetails((prev) => ({
        ...prev,
        [name]: isNaN(numValue) ? 0 : numValue,
      }));
    } else {
      setOrderDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleAddItem = () => {};
  const handleSubmitOrder = () => {};
  return (
    <div className="form">
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>Tạo Đơn Hàng Mới</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px", color: "#fff" }}>Thông tin khách hàng</h3>
        <input
          type="number"
          name="user_id"
          value={orderData.user_id === 0 ? "" : orderData.user_id}
          onChange={handleOrderInputChange}
          style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={orderData.address}
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
        <h3 style={{ marginBottom: "10px", color: "#fff" }}>Thêm món ăn</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "10px", marginBottom: "10px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>ID Món:</label>
            <input
              type="number"
              name="id_dishlist"
              value={orderDetails.id_dishlist}
              onChange={handleOrderInputDetails}
              style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Số lượng:</label>
            <input
              type="number"
              name="quantity"
              value={orderDetails.quantity}
              onChange={handleOrderInputDetails}
              style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Giá:</label>
            <input
              type="number"
              name="price"
              value={orderDetails.price}
              onChange={handleOrderInputDetails}
              style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div style={{ alignSelf: "flex- end" }}>
            <button
              onClick={handleAddItem}
              style={{
                padding: "9px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                position: "relative",
                top: "32%",
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
        <h3 style={{ marginBottom: "10px", color: "#fff" }}>Chi tiết đơn hàng ({orderData.details.length} món)</h3>
        {orderData.details.length === 0 ? (
          <p style={{ color: "#fff" }}>Chưa có món nào được thêm.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {orderData.details.map((item, index) => (
              <li key={index} style={{ borderBottom: "1px dashed #eee", paddingBottom: "10px", marginBottom: "10px", color: "#fff" }}>
                Món {index + 1}: ID {item.id_dishlist}, SL {item.quantity}, Giá {item.price} - Ghi chú: {item.note || "Không"}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleSubmitOrder}
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
      <Button action="cancel" onClick={onHideModal} />
    </div>
  );
}

export default OrderForm;
