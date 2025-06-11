import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { close } from "../../components/pages/features/modal";

interface MenuItemsDataTs {
  id: number;
  label: string;
  path: string;
}

const menuItemsData: MenuItemsDataTs[] = [
  { id: 1, label: "Hot Deals", path: "/menu-page" },
  { id: 2, label: "New products", path: "/menu-page" },
  { id: 3, label: "Combo for 1", path: "/menu-page" },
  { id: 4, label: "Combo for sharing", path: "/menu-page" },
  { id: 5, label: "Fried & Roasted", path: "/menu-page" },
  { id: 6, label: "Rice - Burger - Pasta", path: "/menu-page" },
  { id: 7, label: "Snack", path: "/menu-page" },
  { id: 8, label: "Dessert & Drinks", path: "/menu-page" },
];

export const useHeaderPages = () => {
  const cartItems = useSelector((state: RootState) =>
    state.cart.map((item) => item)
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const dispatch = useDispatch();

  const isOffcanvasOpen = useSelector((state: RootState) => state.loginModal);

  const navigate = useNavigate();

const handleNavigate = (path: string) => {
    dispatch(close());
    setTimeout(() => {
      navigate(path);
    }, 50);
  };

  return {
    navigate,
    menuItemsData,
    cartItems,
    totalQuantity,
    dispatch,
    isOffcanvasOpen,
    handleNavigate
  };
};
