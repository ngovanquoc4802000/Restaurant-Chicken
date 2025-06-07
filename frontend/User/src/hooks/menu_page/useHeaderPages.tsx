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
  { id: 1, label: "Ưu Đãi", path: "/menu-page" },
  { id: 2, label: "Món mới", path: "/menu-page" },
  { id: 3, label: "Combo 1 Người", path: "/menu-page" },
  { id: 4, label: "Combo Nhóm", path: "/menu-page" },
  { id: 5, label: "Gà Rán - Gà Quay", path: "/menu-page" },
  { id: 6, label: "Burger - Cơm - Mỳ Ý", path: "/menu-page" },
  { id: 7, label: "Thức ăn nhẹ", path: "/menu-page" },
  { id: 8, label: "Thức uống & Tráng miệng", path: "/menu-page" },
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
