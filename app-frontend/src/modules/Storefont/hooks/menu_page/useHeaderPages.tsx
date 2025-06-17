import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { close } from "../../components/pages/features/modal";
import { useState } from "react";

interface MenuItemsDataTs {
  id: number;
  label: string;
  path: string;
}

const menuItemsData: MenuItemsDataTs[] = [
  { id: 1, label: "Hot Deals", path: "/menu" },
  { id: 2, label: "New products", path: "/menu" },
  { id: 3, label: "Combo for 1", path: "/menu" },
  { id: 4, label: "Combo for sharing", path: "/menu" },
  { id: 5, label: "Fried & Roasted", path: "/menu" },
  { id: 6, label: "Rice - Burger - Pasta", path: "/menu" },
  { id: 7, label: "Snack", path: "/menu" },
  { id: 8, label: "Dessert & Drinks", path: "/menu" },
];

export const useHeaderPages = () => {
  const [open, setOpen] = useState(false);

  const cartItems = useSelector((state: RootState) =>
    state.cart.map((item) => item)
  );

  const dispatch = useDispatch();

  const isOffcanvasOpen = useSelector((state: RootState) => state.showLogin);

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    dispatch(close());
    setTimeout(() => {
      navigate(path);
    }, 50);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return {
    open,
    handleClose,
    handleOpen,
    navigate,
    menuItemsData,
    cartItems,
    dispatch,
    isOffcanvasOpen,
    handleNavigate,
  };
};
