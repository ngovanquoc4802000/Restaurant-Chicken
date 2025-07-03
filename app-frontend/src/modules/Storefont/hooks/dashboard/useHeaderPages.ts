import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { useState } from "react";
import type { CartTs } from "../../components/pages/dashboard/category/storeCart";

export const useHeaderPagesDB = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartTs[]>([]);

  const openOffcanvas = () => {
    setIsOffcanvasOpen(true);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };
  const navigate = useNavigate();

  const userRole = useSelector((state: RootState) => state.userLogin.rule);

  const handleUser = () => {
    if (userRole === "customer") {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };
  const mergedItemsMap = new Map<string, CartTs>();

  cartItems.forEach((item) => {
    const existing = mergedItemsMap.get(item.name);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      mergedItemsMap.set(item.name, { ...item });
    }
  });

  const mergedItems = Array.from(mergedItemsMap.values());

  const orderId = mergedItems.reduce((sum, acc) => sum + acc.id, 0);

  const totalCartItems = mergedItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return {
    totalCartItems,
    handleUser,
    isOffcanvasOpen,
    setCartItems,
    openOffcanvas,
    closeOffcanvas,
    mergedItems,
    orderId,
  };
};
