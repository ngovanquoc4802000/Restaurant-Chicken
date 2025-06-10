import { queryOptions } from "@tanstack/react-query";
import { getOrderAll } from "../services/orders";

const queriesOrder = {
  list: queryOptions({
    queryKey: ["order"],
    queryFn: async() => {
      const {success, data} = await getOrderAll();
      if(success) return data;
      return null;
    },
    staleTime: 1000 * 60 * 60,
  })
}
export default queriesOrder;