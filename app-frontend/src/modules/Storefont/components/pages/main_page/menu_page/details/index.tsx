import Button from "$/common/button/button";
import InputValue from "$/common/input";
import TextareaValue from "$/common/textarea";
import { useProductDetailPages } from "$/modules/Storefont/hooks/menu_page/useProductDetailPages";
import Footer from "../../../dashboard/footer";
import Header from "../../header_page/header";

function DetailsPage() {
  const {
    isLoading,
    error,
    dishlist,
    quantity,
    orderData,
    orderDetails,
    product,
    isError,
    isSuccess,
    setQuantity,
    handleCart,
    handleInputChange,
    handleNoteChange,
  } = useProductDetailPages();

  if (isLoading || !dishlist) return <div>Loading...</div>;

  if (error) return `Error Product Details ${error}`;

  if (!product) return <div>Product does not exist </div>;
  return (
    <div className="productDetail-container cursor-pointer">
      {isSuccess && <div>Success...</div>}

      {isError && <div>Error...</div>}

      <Header />
      <div className="container mx-auto mt-[100px] lg:mt-[0px]">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start px-4">
          <div className="md:p-8 lg:p-8">
            <div className="product-detail w-full flex justify-center shadow-[0_0_8px_0_rgba(0, 0, 0, 0.2)] rounded-md p-6">
              <img
                className="rounded-xl shadow-lg max-h-[400px] object-cover"
                src={product.images?.[0]?.image}
                alt={product.title}
              />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 md:mb-10 md:p-6 lg:p-6 space-y-4 max-w-md w-full mx-auto">
            <form onSubmit={handleCart} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-600">{product.description}</p>
              <InputValue
                text="Address"
                placeholder="Address..."
                type="text"
                classNameLabel="block font-semibold"
                classNameInput="w-full border p-2 rounded-md focus:ring-2 focus:ring-red-400"
                name="address"
                value={orderData.address}
                onChange={handleInputChange}
              />
              <InputValue
                text="Fullname"
                placeholder="Customer Name...."
                type="text"
                name="customer_name"
                classNameLabel="block font-semibold"
                classNameInput="w-full border p-2 rounded"
                onChange={handleInputChange}
                value={orderData.customer_name}
              />
              <InputValue
                text="Telephone"
                placeholder="Customer Phone..."
                type="text"
                name="customer_phone"
                classNameLabel="block font-semibold"
                classNameInput="w-full border p-2 rounded"
                onChange={handleInputChange}
                value={orderData.customer_phone}
              />
              <TextareaValue
                text="Note order"
                placeholder="Customer Note..."
                name="customer_note"
                value={orderData.customer_note}
                onChange={handleInputChange}
                classNameLabel="block font-semibold"
                classNameInput="w-full border p-2 rounded"
              />
              <InputValue
                text="Notes"
                placeholder="Notes...."
                type="text"
                name="note"
                classNameLabel="block font-semibold"
                classNameInput="w-full border p-2 rounded"
                onChange={handleNoteChange}
                value={orderDetails.note}
              />
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-200 text-lg rounded hover:bg-gray-300"
                  text="-"
                />
                <span>{quantity}</span>
                <Button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-200 text-lg rounded hover:bg-gray-300"
                  text="+"
                />
              </div>
              <Button
                type="submit"
                text={`Add cart (${(Number(product.price) * quantity).toFixed(
                  3
                )} đ)`}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-[50px] transition"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailsPage;
