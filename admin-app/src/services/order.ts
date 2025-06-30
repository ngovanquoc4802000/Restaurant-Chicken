import { PayloadOrder, ResponseApiCreateOrder } from "../types/dishlist";
import { RequestAxios } from "../utils/http";

export const orderApi = async (payload: PayloadOrder) => {
  const { data } = await RequestAxios.post<ResponseApiCreateOrder>(`/order/create`, payload);
  return data;
};
