import type { CreateOrderPayload, OrderAllTs, OrderTableTs } from "../mockup/order";
import { Request } from "../utils/http";

export const getOrderAll = async () => {
  try {
    const result = await Request.get<OrderAllTs>("order");
    return result.data;
  } catch (_) {
    return {
      success: false,
      message: "",
      data: [],
    };
  }
};

export const createOrder = async (payload: CreateOrderPayload) => {
  try {
    const { data } = await Request.post<OrderTableTs>("order/create", payload);
    return data;
  } catch (error) {
    console.error("Error in createOrder service:", error);
    throw error;
  }
};

