import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "../../../Admin/services/order";

import { slugify } from "../../components/pages/dashboard/menu/ultils";
import { addToCart } from "../../components/pages/features/cartSlice";
import { close, open } from "../../components/pages/features/modal";
import queriesDishlist from "../../queries/dishlist";
import type { RootState } from "../../store/store";
import type { CreateOrderPayload, OrderDetailsTs, OrderTableTs } from "$/modules/Admin/types/order";

export const useProductDetailsPage = () => {

  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  
  const { slugProduct } = useParams();

  const userRule = useSelector((state: RootState) => state.userLogin.rule);
  
  const isAuthentication = useSelector(
    (state: RootState) => state.userLogin.isAuthenticated
  );
  const {
    isLoading,
    error,
    data: dishlist,
  } = useQuery({ ...queriesDishlist.list });

  const isOpen = useSelector((state: RootState) => state.showLogin);

  const product = dishlist?.find((item) => slugify(item.title) === slugProduct);

  useEffect(() => {
    if (userRule === "customer") {
      setIsActive(true);
    } else if (userRule === "admin") {
      alert("admin không có quyền đăng nhập");
      dispatch(close());
    } else {
      setIsActive(false);
    }
  }, [userRule]);
  const handleOrderClick = () => {
    if (!isAuthentication) {
      dispatch(open());
    }
  };
  /* -------------------------------------- */
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const user = useSelector((state: RootState) => state.userLogin.id);
  
  const [orderData, setOrderData] = useState<OrderTableTs>({
    id: 0,
    user_id: Number(user),
    address: "",
    customer_note: "",
    customer_name: "",
    customer_phone: "",
    details: [],
    create_at: new Date(),
  });
  const [orderDetails, setOrderDetails] = useState<OrderDetailsTs>({
    id_dishlist: 0,
    quantity: 0,
    price: 0,
    note: "",
  });

  const handleCart = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createUpdate();
  };

  const create = async () => {
    const finalOrder: CreateOrderPayload = {
      user_id: Number(user),
      address: orderData.address,
      customer_note: orderData.customer_note,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      list_order: [
        {
          id_dishlist: Number(product?.id),
          quantity: Number(quantity),
          price: Number(product?.price),
          note: orderDetails.note,
        },
      ],
    };
    const res = await createOrder(finalOrder);
    if (product) {
      dispatch(
        addToCart({
          id_dishlist: Number(product.id),
          quantity: Number(quantity),
          price: Number(product.price),
          title: product.title,
          image: product.images?.[0]?.image ?? "",
          note: orderDetails.note,
        })
      );
    }
    return res;
  };

  const { mutate: createUpdate } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      navigate("/menu");
      alert("đặt đơn hàng thành công")
     
    },
    onError: () => {
      alert("Thêm vào giỏ hàng thất bại!");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNoteChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOrderDetails((prev) => ({ ...prev, note: e.target.value }));
  };

  return {
    handleCart,
    handleInputChange,
    handleNoteChange,
    setQuantity,
    handleOrderClick,
    setIsActive,
    orderData,
    orderDetails,
    quantity,
    isOpen,
    isActive,
    product,
    isLoading,
    error,
    dishlist,
    slugProduct,
  };
};
