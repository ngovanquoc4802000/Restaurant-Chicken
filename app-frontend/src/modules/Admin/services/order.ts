import { axiosInstance, Request } from "$/modules/Storefont/utils/http";
import type { CreateOrderPayload, OrderAllTs, OrderTableTs } from "../types/order";

export const getOrderAll = async () => {
  try {
    const result = await Request.get<OrderAllTs>("order");
    console.log(result.data)
    return result.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "",
      data: [],
    };
  }
};

export const getOrderId = async (id: number | undefined | null) => {
  try {
    const result = await axiosInstance.get<OrderAllTs>(`order/cart/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (payload: CreateOrderPayload) => {
  try {
    const data = await axiosInstance.post<OrderTableTs>("order/create", payload);
    return data;
  } catch (error) {
    console.error("Error in createOrder service:", error);
    throw error;
  }
};

export const updateOrder = async (id: number | undefined | null, update: CreateOrderPayload) => {
  try {
    const data = await axiosInstance.put(`order/${id}`, update);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderProcess = async (id: number | undefined | null) => {
  try {
    const data = await axiosInstance.put(`order/process/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
