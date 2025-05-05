import { queryOptions } from "@tanstack/react-query";
import { getOrderAll, getOrderId } from "../services/order";

const queriesOrder = {
  list: queryOptions({
    queryKey: ["order"],
    queryFn: async () => {
      const { success, data } = await getOrderAll();
      if (success) return data;
      return null;
    },
    staleTime: 1000 * 60 * 60,
  }),
  detail: (id: number | null | undefined) =>
    queryOptions({
      queryKey: ["order", id],
      queryFn: async () => {
        if (id === null || id === undefined) {
          throw new Error("Order ID is required");
        }
        const result = await getOrderId(id);
        const data = result?.data?.data;
        if (Array.isArray(data)) return data[0];
        return data;
      },
      staleTime: 1000 * 60 * 5,
      enabled: !!id,
    }),
};

export default queriesOrder;
