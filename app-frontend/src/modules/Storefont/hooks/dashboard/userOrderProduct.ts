/* import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../components/pages/features/cartSlice";
import type { RootState } from "../../store/store";
import queriesOrder from "../../queries/order";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import queriesDishlist from "../../queries/dishlist";
 */
/* export const useOrderProductDB = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    data: orderList,
    isError,
    isLoading,
  } = useQuery({ ...queriesOrder.list });
 const userId = useSelector((state: RootState) => state.userLogin.id);
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

  const cart = useSelector((state: RootState) => state.cart);

 

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
}; */

import { useCallback, useState } from "react";
import type { CartTs } from "../../components/pages/dashboard/category/storeCart";

export const useOrderProductDB = () => {
  const [loaded, setLoaded] = useState<CartTs[]>([]);

  const mergedItemsMap = new Map<string, CartTs>();

  loaded.forEach((item) => {
    const existing = mergedItemsMap.get(item.name);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      mergedItemsMap.set(item.name, { ...item });
    }
  });

  const mergedItems = Array.from(mergedItemsMap.values());
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const calculatorPrice = mergedItems.reduce((sum, acc) => sum + acc.price * acc.quantity * 1000, 0);
  const calculatOrder = mergedItems.reduce((sum, acc) => sum + acc.quantity, 0);

  const orderId = mergedItems.reduce((sum, acc) => sum + acc.id, 0);

  const handleIncrease = useCallback(
    (name: string) => {
      const updatedCart = loaded.map((item) => (item.name === name ? { ...item, quantity: item.quantity + 1 } : item));

      setLoaded(updatedCart);
      localStorage.setItem("storeCart", JSON.stringify(updatedCart));
    },
    [loaded]
  );

  const handleDecrease = useCallback(
    (name: string) => {
      const updateDecrease = loaded.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      );
      setLoaded(updateDecrease);
      localStorage.setItem("storeCart", JSON.stringify(updateDecrease));
    },
    [loaded]
  );

  const handleDelete = (name: string) => {
    const deleteCart = loaded.filter((item) => item.name !== name);
    setLoaded(deleteCart);
    localStorage.setItem("storeCart", JSON.stringify(deleteCart));
  };
  return {
    setLoaded,
    handleDecrease,
    handleDelete,
    handleIncrease,
    calculatOrder,
    calculatorPrice,
    orderId,
    formatCurrency,
    mergedItems,
  };
};
