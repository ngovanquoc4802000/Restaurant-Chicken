import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../components/pages/features/cartSlice";
import type { RootState } from "../../store/store";

export const useOrderProductDB = () => {
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

  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return {
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
