import type { CreateOrderPayload, OrderAllTs, OrderTableTs } from "../mockup/order";
import { axiosInstance } from "../utils/http";

export const getOrderAll = async () => {
  try {
    const result = await axiosInstance.get<OrderAllTs>("order");
    console.log(result.data.data + "Order all")
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
export const getOrderId = async (id: number | null | undefined) => {
  try {
    const result = await axiosInstance.get<OrderAllTs>(`order/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (payload: CreateOrderPayload) => {
  try {
    const { data } = await axiosInstance.post<OrderTableTs>("order/create", payload);
    return data;
  } catch (error) {
    console.error("Error in createOrder service:", error);
    throw error;
  }
};

