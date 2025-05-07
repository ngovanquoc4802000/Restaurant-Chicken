import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { updateOrderProcess } from "../../services/order";
import { OrderDetailsTs, OrderTableTs } from "../../types/order";
import queriesDishlist from "../../queries/dishlist";

interface OrderTs {
  item: OrderDetailsTs[];
  orderId: number | undefined | null;
  currentStep?: string;
  onHideModal: () => void;
}

function OrderDetails({ item, onHideModal, orderId, currentStep }: OrderTs) {
  const { data: dishlistName } = useQuery({ ...queriesDishlist.list });

  const [step, setStep] = useState<string>(currentStep || "");

  const queryClient = useQueryClient();

  const update = async () => {
    try {
      const result = await updateOrderProcess(orderId);
      if (result?.nextStep) {
        setStep(result.nextStep);
        queryClient.setQueryData(["order", orderId], (oldData: OrderTableTs) => ({
          ...oldData,
          currentStep: result.nextStep,
        }));
        await queryClient.invalidateQueries({ queryKey: ["order", orderId], refetchType: "all" });
      } else {
        alert("Không thể cập nhật tiến trình đơn hàng.");
      }
    } catch (error) {
      console.error("lỗi khi cập nhật tiến trình đơn hàng:", error);
      alert("Đã xảy ra lỗi khi cập nhật đơn hàng.");
    }
  };

  const orderMap = useMemo(() => {
    const map = new Map();
    dishlistName?.forEach((cat) => map.set(cat.id, cat.name));
    return map;
  }, [dishlistName]);

  const getOrderName = useCallback((id: string | number) => orderMap.get(id) || "Không xác định", [orderMap]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Chi tiết đơn hàng</h2>

        <p>
          <strong>Trạng thái hiện tại:</strong> {step || "Chưa cập nhật"}
        </p>

        {item?.map(({ note, price, id_dishlist, quantity }, index) => (
          <div className="modal-details" key={index}>
            <p>Món ăn: {getOrderName(id_dishlist)}</p>
            <p>Số lượng: {quantity}</p>
            <p>Giá: {price}</p>
            <p>Ghi chú: {note}</p>
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
