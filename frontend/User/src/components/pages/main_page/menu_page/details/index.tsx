import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { CreateOrderPayload, OrderDetailsTs, OrderTableTs } from "../../../../../mockup/order";
import queriesDishlist from "../../../../../queries/dishlist";
import { createOrder } from "../../../../../services/orders";
import type { RootState } from "../../../../../store/store";
import { slugify } from "../../../category/ultils/slugify";
import Footer from "../../../dashboard/footer";
import Header from "../../header_page/header";


function DetailsPage() {
  
  const navigate = useNavigate();
  
  const { slugProduct } = useParams();
  
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
    return await createOrder(finalOrder);
  }

  const { isSuccess, isError, mutate: createUpdate } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      alert("Thêm vào giỏ hàng thành công!");
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
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      {/* product detail */}
      <div className="container mx-auto mt-[100px]">
        <div className="grid xl:grid-cols-2">
          <div className="col-lg-6" style={{ padding: "2rem" }}>
            <div className="product-detail shadow-[0_0_8px_0_rgba(0, 0, 0, 0.2)] rounded-md p-6">
              <img className="rounded-md w-full" src={product.images?.[0]?.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <span>{product.price}</span>
            </div>
          </div>
          <div className="col-lg-6 p-8">
            <form onSubmit={handleCart}>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="px-3 py-1 bg-gray-200 rounded">-</button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((prev) => prev + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
              </div>

              <div>
                <label className="block font-semibold">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold">Họ tên</label>
                <input
                  type="text"
                  name="customer_name"
                  required
                  value={orderData.customer_name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold">Số điện thoại</label>
                <input
                  type="text"
                  name="customer_phone"
                  required
                  value={orderData.customer_phone}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold">Ghi chú đơn hàng</label>
                <textarea
                  name="customer_note"
                  value={orderData.customer_note}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold">Ghi chú món ăn</label>
                <input
                  type="text"
                  name="note"
                  value={orderDetails.note}
                  onChange={handleNoteChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <button
                className="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700"
                type="submit">Thêm vào giỏ hàng{(Number(product.price) * quantity).toFixed(3)}</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailsPage;
