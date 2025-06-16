import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../components/pages/features/cartSlice";
import type { RootState } from "../../store/store";

export const useOrderProductDB = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const login = useSelector((state: RootState) => state.userLogin);
  console.log(login.accessToken);
  const [cartItem] = cart;
/*   const { data: order } = useQuery({ ...queriesOrder.list });
  const userId = localStorage.getItem("userId");
  const list  *//* = order?.map((item) => item.details); */
/*   useEffect(() => {
    if (userId === ) {
      localStorage.setItem("listCart", list);
    }
  }, [list]); */
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
    cart,
    cartItem,
    sumOrder,
    total_price,
    handleRemove,
  };
};
