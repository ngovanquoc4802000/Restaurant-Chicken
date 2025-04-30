import { queryOptions } from "@tanstack/react-query";
import { getUserAll } from "../services/users";

const queriesUser = {
  list: queryOptions({
    queryKey: ["users"],
    queryFn: async () => {
      const { success, data } = await getUserAll();
      if (success) return data;
      return null;
    },
    staleTime: 1000 * 60 * 60,
  }),
};
export default queriesUser;
