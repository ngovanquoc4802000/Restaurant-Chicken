import { useOrderDetails } from "../../customHook/userOrderDetails";
import { OrderDetailsTs } from "../../types/order";

interface OrderTs {
  item: OrderDetailsTs[];
  orderId: number | undefined | null;
  currentStep?: string;
  onHideModal: () => void;
}

function OrderDetails({ item, onHideModal, orderId, currentStep }: OrderTs) {
  const { update, getOrderName, step } = useOrderDetails(currentStep, orderId);

  if (!item) return <h1>I don't item no show </h1>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Chi tiết đơn hàng</h2>

        <p>
          <strong>Trạng thái hiện tại:</strong> {step || "Chưa cập nhật"}
        </p>

        {item.map((item) => (
          <div className="modal-details" key={item.id_dishlist}>
            <p>Món ăn: {getOrderName(item.id_dishlist)}</p>
            <p>Số lượng: {item.quantity}</p>
            <p>Giá: {item.price}</p>
            <p>Ghi chú: {item.note}</p>
          </div>
        ))}

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={onHideModal}>Đóng</button>
          <button onClick={update}>Cập nhật trạng thái</button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
