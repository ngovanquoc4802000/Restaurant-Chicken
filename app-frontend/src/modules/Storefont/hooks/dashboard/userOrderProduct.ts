import { useCallback, useState } from "react";
import type { CartTs } from "../../components/pages/dashboard/category/storeCart";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { getUserAll } from "$/modules/Admin/services/users";

export const useOrderProductDB = () => {
  const [loaded, setLoaded] = useState<CartTs[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const emailRedux: string | null = useSelector((state: RootState) => state.userLogin.email);

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

  const handleCheckOut = async () => {
    try {
      const getAllUser = await getUserAll();
      if (!getAllUser?.data) {
        console.log("Không lấy được danh sách người dùng");
        setIsModal(true);
        return;
      }
      const emailExists = getAllUser.data.some((user) => user.email === emailRedux);
      if (emailExists) {
        navigate("/checkout");
        console.log("Get Email Completed");
      } else {
        console.log("No find Email");
        setIsModal(true);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra email:", error);
      setIsModal(true);
    }
  };
  return {
    handleCheckOut,
    setIsModal,
    isModal,
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
