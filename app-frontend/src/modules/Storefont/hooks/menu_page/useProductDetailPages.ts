import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { slugify } from "../../components/pages/dashboard/menu/ultils";
import { createOrder } from "../../services/orders";
import { addToCart } from "../../components/pages/features/cartSlice";
import type { RootState } from "../../store/store";
import type {
    CreateOrderPayload,
    OrderDetailsTs,
    OrderTableTs,
} from "../../mockup/order";
import queriesDishlist from "../../queries/dishlist";

export const useProductDetailPages = () => {
  const user = useSelector((state: RootState) => state.userLogin.id);
  
  const [orderData, setOrderData] = useState<OrderTableTs>({
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
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const { slugProduct } = useParams();
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    data: dishlist,
  } = useQuery({ ...queriesDishlist.list });

  const handleCart = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createUpdate();
  };

  const product = dishlist?.find((item) => slugify(item.title) === slugProduct);

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
  const {
    isSuccess,
    isError,
    mutate: createUpdate,
  } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      navigate("/menu-page");
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
    handleNoteChange,
    handleInputChange,
    handleCart,
    isSuccess,
    isError,
    product,
    orderDetails,
    setOrderDetails,
    orderData,
    setOrderData,
    isLoading,
    error,
    dispatch,
    navigate,
    slugProduct,
    dishlist,
    quantity,
    setQuantity,
    user,
  };
};
