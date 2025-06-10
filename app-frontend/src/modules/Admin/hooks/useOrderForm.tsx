import { useCallback, useMemo, useState } from "react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import queriesUser from "../queries/users";
import queriesOrder from "../queries/orders";
import queriesDishlist from "../queries/dishlist";
import { createOrder, updateOrder } from "../services/order";
import type { CreateOrderPayload, OrderDetailsTs, OrderTableTs } from "../types/order";

const initialOrder: OrderTableTs = {
  user_id: "",
  address: "",
  customer_note: "",
  customer_name: "",
  customer_phone: "",
  details: [],
  create_at: new Date(),
};

const initialDetail: OrderDetailsTs = {
  id_dishlist: "",
  quantity: 0,
  price: 0,
  note: "",
};

export const useOrderForm = (onHideModal: () => void, idDetail: number | undefined | null) => {
  const [orderData, setOrderData] = useState<OrderTableTs>(initialOrder);

  const [orderDetails, setOrderDetails] = useState<OrderDetailsTs>(initialDetail);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrder();
  };
  const isEdit = idDetail !== null && idDetail !== undefined;

  const createOrUpdate = useCallback(async () => {
    const sanitizedDetails = orderData.details.map((item) => ({
      id: idDetail,
      id_dishlist: Number(item.id_dishlist),
      quantity: Number(item.quantity),
      price: Number(item.price),
      note: item.note || "",
    }));
    const payload: CreateOrderPayload = {
      user_id: Number(orderData.user_id),
      address: orderData.address,
      customer_note: orderData.customer_note,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      list_order: sanitizedDetails,
    };
    return isEdit && idDetail ? await updateOrder(idDetail, payload) : await createOrder(payload);
  }, [orderData, idDetail, isEdit]);

  const { isPending, mutate: submitOrder } = useMutation({
    mutationFn: createOrUpdate,

    onSuccess: (data: OrderTableTs) => {
      queryClient.invalidateQueries({ queryKey: queriesOrder.list.queryKey });

      queryClient.setQueryData(queriesOrder.list.queryKey, (update: OrderTableTs[] | undefined | null) => {
        if (!update) return [];

        return update.map((item) => (item.id === idDetail ? { ...item, ...data } : item));
      });

      if (isEdit && idDetail) {
        queryClient.setQueryData(queriesOrder.detail(idDetail).queryKey, data);
      }
      setOrderData(orderData);

      onHideModal();
    },
    onError: (error) => {
      console.log("Create Or Update Defails" + error);
    },
  });

  const queryClient = useQueryClient();

  const result = useQueries({
    queries: [
      {
        ...queriesUser.list,
      },
      {
        ...queriesOrder.detail(idDetail),
        enabled: isEdit,
      },
      {
        ...queriesDishlist.list,
      },
    ],
  });

  const userData = result[0].data;

  const detail = result[1].data;

  const dishListId = result[2].data;

  const handleAddDish = (e: React.MouseEvent) => {
    e.preventDefault();
    if (orderDetails.id_dishlist && orderDetails.quantity && orderDetails.price) {
      setOrderData((prev) => ({
        ...prev,
        details: [orderDetails, ...prev.details],
      }));

      setOrderDetails({
        id_dishlist: 0,
        quantity: 0,
        price: 0,
        note: "",
      });
    }
  };

  const handleOrderInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderInputDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "quantity" || name === "price" || name === "id_dishlist") {
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

  const dishlistName = useMemo(() => {
    const map = new Map();
    dishListId?.forEach((item) => map.set(item.id, item.name));
    return map;
  }, [dishListId]);

  const findNameDishList = useCallback((id: string | number) => dishlistName.get(id) || undefined, [dishlistName]);

  return {
    handleAddDish,
    handleOrderInputChange,
    handleOrderInputDetails,
    findNameDishList,
    isPending,
    isEdit,
    userData,
    detail,
    dishListId,
    queryClient,
    orderData,
    orderDetails,
    handleSubmitOrder,
    setOrderData,
    setOrderDetails,
  };
};
