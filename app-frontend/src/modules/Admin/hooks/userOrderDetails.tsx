import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import queriesDishlist from "../queries/dishlist";
import { updateOrderProcess } from "../services/order";
import queriesOrder from "../queries/orders";
import type { OrderTableTs } from "../types/order";

export const useOrderDetails = (currentStep: string | undefined, orderId: number | undefined | null) => {
  const { data: dishlistName } = useQuery({ ...queriesDishlist.list });

  const [step, setStep] = useState<string>(currentStep || "");

  const queryClient = useQueryClient();
  const orderMap = useMemo(() => {
    const map = new Map();
    dishlistName?.forEach((cat) => map.set(cat.id, cat.name));
    return map;
  }, [dishlistName]);

  const getOrderName = useCallback((id: string | number) => orderMap.get(id) || "Không xác định", [orderMap]);
  const update = async () => {
    try {
      const result = await updateOrderProcess(orderId);

      if (result?.nextStep) {
        setStep(result.nextStep);
        queryClient.setQueryData(["order", orderId], (oldData: OrderTableTs) => ({
          ...oldData,
          currentStep: result.nextStep,
        }));

        queryClient.invalidateQueries({ queryKey: queriesOrder.list.queryKey });
      } else {
        alert("Không thể cập nhật tiến trình đơn hàng.");
      }
    } catch (error) {
      console.error("lỗi khi cập nhật tiến trình đơn hàng:", error);
      alert("Đã xảy ra lỗi khi cập nhật đơn hàng.");
    }
  };
  return {
    update,
    dishlistName,
    step,
    setStep,
    queryClient,
    getOrderName,
  };
};
