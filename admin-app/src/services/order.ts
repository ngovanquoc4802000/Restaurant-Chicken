import { CreateOrderPayload, OrderAllTs, OrderProcess, OrderTableTs } from "../types/order";
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

export const getOrderId = async (id: number | undefined | null) => {
  try {
    const result = await Request.get<OrderAllTs>(`order/${id}`);
    return result;
  } catch (error) {
    console.log(error);
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

export const updateOrder = async (id: number | undefined | null, update: CreateOrderPayload) => {
  try {
    const data = await Request.put(`order/${id}`, update);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderProcess = async (id: number | undefined | null) => {
  try {
    const data = await Request.put(`order/process/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
