import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../components/pages/features/cartSlice";
import type { RootState } from "../../store/store";

export const useOrderProductDB = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const userId = useSelector((state: RootState) => state.userLogin.id);
  const rule = useSelector((state: RootState) => state.userLogin.rule);
  const id_dishlist = Number(localStorage.getItem("id_dishlist"));
  const quantity = Number(localStorage.getItem("quantity"));
  const price = Number(localStorage.getItem("price"));
  const title = localStorage.getItem("title");
  const image = localStorage.getItem("image");
  const note = localStorage.getItem("note");

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
    quantity,
    price,
    title,
    image,
    note,


    rule,
    userId,
    cart,
    cartItem,
    sumOrder,
    total_price,
    handleRemove,
  };
};
