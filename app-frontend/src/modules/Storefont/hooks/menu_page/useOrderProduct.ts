import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { removeFromCart } from "../../components/pages/features/cartSlice";

export const useOrderProduct = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const [cartItem] = cart;

  const sumOrder = cart.reduce((sum, acc) => sum + acc.quantity, 0);

  const total_price = cart.reduce((sum, acc) => sum + acc.price * acc.quantity, 0);

  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return {
    cart,
    cartItem,
    sumOrder,
    total_price,
    handleRemove,
  };
};
