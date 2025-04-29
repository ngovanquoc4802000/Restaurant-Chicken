import { createOrder, getOrderAll } from "../../../services/order";
import { CreateOrderPayload, OrderDetailsTs, OrderTableTs } from "../../../types/order";

interface CreateTs {
  orderData: OrderTableTs;
  orderDetails: OrderDetailsTs;
  setOrderData: React.Dispatch<React.SetStateAction<OrderTableTs>>;
  setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetailsTs>>;
  setOrderList: React.Dispatch<React.SetStateAction<OrderTableTs[]>>;
  onClose: () => void;
}

const CreateOrderForm = ({ orderData, orderDetails, setOrderData, setOrderDetails, setOrderList, onClose }: CreateTs) => {
  const handleSubmitOrder = async () => {
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
      const createdOrderData = await createOrder(orderPayload);
      console.log("Order created successfully:", createdOrderData);
      if (createdOrderData) {
        const { data } = await getOrderAll();
        setOrderList(data);
      }
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
    </div>
  );
};

export default CreateOrderForm;
