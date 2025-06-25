import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../components/pages/features/cartSlice";
import type { RootState } from "../../store/store";
import queriesOrder from "../../queries/order";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import queriesDishlist from "../../queries/dishlist";

export const useOrderProductDB = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    data: orderList,
    isError,
    isLoading,
  } = useQuery({ ...queriesOrder.list });

  const {
    isError: isErrorDishlist,
    isLoading: isLoadingDishlist,
    data: dishlist,
  } = useQuery({ ...queriesDishlist.list });

  const findUserId = orderList?.filter((item) => item.user_id === userId);

  const totalDishes =
    findUserId?.reduce((acc, curr) => acc + curr.details.length, 0) ?? 0;

  const totalQuantity =
    findUserId?.reduce(
      (acc, curr) =>
        acc + curr.details.reduce((sum, d) => sum + d.quantity * d.price, 0),
      0
    ) ?? 0;
  const hasOrders =
    orderList &&
    orderList.length > 0 &&
    orderList.some((item) => item.details.length > 0);
  /*   const largerId = findUserId?.map((item) => item.details.length > 0); */


  const cart = useSelector((state: RootState) => state.cart);

  const userId = useSelector((state: RootState) => state.userLogin.id);

  const id_dishlist = useSelector((state: RootState) => state.cart);

  const rule = useSelector((state: RootState) => state.userLogin.rule);

  const [cartItem] = cart;

  const sumOrder = cart.reduce((sum, acc) => sum + acc.quantity, 0);

  const total_price = cart.reduce(
    (sum, acc) => sum + acc.price * acc.quantity,
    0
  );
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return {
    queryClient,
    totalDishes,
    totalQuantity,
    isError,
    isLoading,
    isErrorDishlist,
    isLoadingDishlist,
    dishlist,
    findUserId,
    orderList,
   hasOrders,

    id_dishlist,
    rule,
    userId,
    cartItem,
    cart,
    sumOrder,
    total_price,
    handleRemove,
  };
};
