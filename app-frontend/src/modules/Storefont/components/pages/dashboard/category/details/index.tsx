import Button from "../../../../../../../common/button/button";
import InputValue from "../../../../../../../common/input";
import TextareaValue from "../../../../../../../common/textarea";
import { useProductDetailsPage } from "../../../../../hooks/dashboard/useProductDetailPages";
import Footer from "../../footer";
import Header from "../../header";
import ModalLogin from "../../modal/login";

function ProductDetail() {
  const {
     handleOrderClick,
     isOpen,
      isLoading,
      isActive,
      error,
      product,
      dishlist,
      handleCart,
      handleInputChange,
      handleNoteChange,
      setQuantity,
      orderData,
      orderDetails,
      quantity
         } =
    useProductDetailsPage();

  if (isLoading || !dishlist) return <div>Loading...</div>;

  if (error) return `Error Product Details ${error}`;

  if (!product) return <div>Product does not exits</div>;

  return (
    <div className="productDetail-container cursor-pointer">
      <Header />
      <div className="container mx-auto px-4 md:mt-[6rem] xl:mt-[2rem] py-8 xl:pl-[12rem] xl:pr-[12rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 items-start">
          <div className="md:p-4 p-6">
            <div className="product-detail md:mt-8 shadow-lg rounded-md p-6 bg-white">
              <img
                className="rounded-md w-full h-auto object-cover mb-4"
                src={product.images?.[0]?.image}
                alt={product.title}
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <span className="text-2xl font-bold text-red-600">
                {product.price}
              </span>
            </div>
          </div>
          <div className="md:p-4 md:mt-4">
            <div className="product-button mb-[-1rem] justify-start md:p-2  md:mb-[0px] lg:mb-[0px] xl:mb-[0px]  flex flex-col items-center lg:justify-center lg:justify-center xl:justify-center md:justify-center min-h-[300px]  md:min-h-[400px] lg:min-h-[600px]  rounded-md p-6">
              {isOpen && <ModalLogin />}
              {/* hiển thị form */}
              {isActive ? (
                <div className="bg-white rounded-xl shadow-lg p-4 md:mb-10 md:p-4 lg:p-6 space-y-4 max-w-md w-full mx-auto">
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
                        onClick={() =>
                          setQuantity((prev) => Math.max(1, prev - 1))
                        }
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
                      text={`Add cart (${(
                        Number(product.price) * quantity
                      ).toFixed(3)} VND)`}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-[50px] transition"
                    />
                  </form>
                </div>  
              ) : (
                <Button
                  onClick={handleOrderClick}
                  className="w-11/12 py-4 px-8 border-none rounded-[50px] text-center text-white bg-[#e4002b] font-bold text-xl cursor-pointer mt-4 hover:bg-[#c90025] transition-colors duration-200"
                  text="Start order"
                />
                
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
