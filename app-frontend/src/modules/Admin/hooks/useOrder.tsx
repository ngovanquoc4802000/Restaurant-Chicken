import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import queriesUser from "../queries/users";
import queriesOrder from "../queries/orders";
import type { OrderDetailsTs } from "../types/order";

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
export const useOrder = () => {
  const [stateOrder, setStateOrder] = useState<OrderStateTs>(initialOrderTs);

  const { isLoading, isError, data: orderList } = useQuery({ ...queriesOrder.list });
  console.log(orderList);
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

  return {
    getFindUser,
    handleDetails,
    handleEditOrder,
    handleHideDetail,
    stateOrder,
    setStateOrder,
    isLoading,
    isError,
    orderList,
    userName,
  };
};
