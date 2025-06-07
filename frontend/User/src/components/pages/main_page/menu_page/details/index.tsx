import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "../../../../../services/orders";
import { addToCart } from "../../../features/cartSlice";
import type { CreateOrderPayload, OrderDetailsTs, OrderTableTs } from "../../../../../mockup/order";
import type { RootState } from "../../../../../store/store";
import queriesDishlist from "../../../../../queries/dishlist";
import Button from "../../../common/button";
import InputValue from "../../../common/input";
import TextareaValue from "../../../common/textarea";
import Footer from "../../../dashboard/footer";
import Header from "../../header_page/header";
import { slugify } from "../../../dashboard/menu/ultils";


function DetailsPage() {

  const navigate = useNavigate();

  const { slugProduct } = useParams();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userLogin.id);

  const { isLoading, error, data: dishlist } = useQuery({ ...queriesDishlist.list });

  const [quantity, setQuantity] = useState(1);

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
  const product = dishlist?.find(
    (item) => slugify(item.title) === slugProduct
  );
  const handleCart = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    createUpdate();
  }
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
          note: orderDetails.note
        }
      ],
    };
    const res = await createOrder(finalOrder);
    if (product) {
      dispatch(addToCart({
        id_dishlist: Number(product.id),
        quantity: Number(quantity),
        price: Number(product.price),
        title: product.title,
        image: product.images?.[0]?.image ?? "",
        note: orderDetails.note
      }));
    }
    return res;
  }

  const { isSuccess, isError, mutate: createUpdate } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      navigate("/menu-page");
    },
    onError: () => {
      alert("Thêm vào giỏ hàng thất bại!");
    }
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrderDetails((prev) => ({ ...prev, note: e.target.value }));
  };
  if (isLoading || !dishlist) return <div>Loading...</div>

  if (error) return `Error Product Details ${error}`;

  if (!product) return <div>Sản phẩm không tồn tại</div>;
  return (
    <div className="productDetail-container cursor-pointer">
      {isSuccess && <div>Success...</div>}
      {isError && <div>Error...</div>}
      <Header />
      <div className="container mx-auto mt-[100px] lg:mt-[0px]">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start px-4">
          <div className="md:p-8 lg:p-8" >
            <div className="product-detail w-full flex justify-center shadow-[0_0_8px_0_rgba(0, 0, 0, 0.2)] rounded-md p-6">
              <img className="rounded-xl shadow-lg max-h-[400px] object-cover" src={product.images?.[0]?.image} alt={product.title} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 md:mb-10 md:p-6 lg:p-6 space-y-4 max-w-md w-full mx-auto">
            <form onSubmit={handleCart} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
              <InputValue text="Địa chỉ" type="text" classNameLabel="block font-semibold" classNameInput="w-full border p-2 rounded-md focus:ring-2 focus:ring-red-400" name="address" value={orderData.address} onChange={handleInputChange} />
              <InputValue text="Họ tên" type="text" name="customer_name" classNameLabel="block font-semibold" classNameInput="w-full border p-2 rounded" onChange={handleInputChange} value={orderData.customer_name} />
              <InputValue text="Số điện thoại" type="text" name="customer_phone" classNameLabel="block font-semibold" classNameInput="w-full border p-2 rounded" onChange={handleInputChange} value={orderData.customer_phone} />
              <TextareaValue text="Ghi chú đơn hàng" name="customer_note" value={orderData.customer_note} onChange={handleInputChange} classNameLabel="block font-semibold" classNameInput="w-full border p-2 rounded" />
              <InputValue text="Ghi chú" type="text" name="note" classNameLabel="block font-semibold" classNameInput="w-full border p-2 rounded" onChange={handleNoteChange} value={orderDetails.note} />
              <div className="flex items-center gap-4">
                <Button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="px-3 py-1 bg-gray-200 text-lg rounded hover:bg-gray-300" text="-"/>
                <span>{quantity}</span>
                <Button type="button" onClick={() => setQuantity((prev) => prev + 1)} className="px-3 py-1 bg-gray-200 text-lg rounded hover:bg-gray-300" text="+"/>
              </div>
              <Button type="submit" text={`Thêm vào giỏ hàng (${(Number(product.price) * quantity).toFixed(3)} VND)`} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-[50px] transition" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailsPage;
