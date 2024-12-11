/* import { ListOrder, PayloadOrder } from "../types/dishlist";
import { RequestAxios } from "../utils/http";

export const orderApi = async (payload: PayloadOrder): Promise<ListOrder> => {
  const { data } = await RequestAxios.post<ListOrder>(`/order/create`, payload);
  return data;
};
 */
