import Button from "$/common/button/button";
import InputValue from "$/common/input";
import TextareaValue from "$/common/textarea";
import { useProductDetailsPage } from "$/modules/Storefont/hooks/dashboard/useProductDetailPages";
import Footer from "../../footer";
import Header from "../../header";
import ModalLogin from "../../modal/login";

function ProductDetail() {
  const {
    /* handleOrderClick, */
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
    quantity,
    handleClick,
    total_price
  } = useProductDetailsPage();
 
  if (isLoading || !dishlist) return <div>Loading...</div>;

  if (error) return `Error Product Details ${error}`;

  if (!product) return <div>Product does not exits</div>;

  return (
    <div className="productDetail-container cursor-pointer">
      <Header />
      <div className="container mx-auto px-4 md:pr-[0px] md:mt-[4rem] md:pb-[0px] md:ml-[3rem] md:mr-[0px] xl:mb-[0px] xl:mt-[0rem] xl:py-0 py-12 xl:pl-[12rem] xl:pr-[12rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 items-center">
          <div className="md:p-4 p-6">
            <div className="product-detail shadow-lg rounded-md p-6 bg-white">
              <div></div>
              <img
                className="rounded-md xl:w-full lg:w-full xl:object-fill w-full h-auto object-cover mb-4"
                src={product.images?.[0]?.image}
                alt={product.title}
              />
            </div>
          </div>
          <div className="md:p-4 md:mt-4">
            <div className="product-button mb-[-1rem] justify-start md:p-2  md:mb-[0px] lg:mb-[0px] xl:mb-[0px]  flex flex-col items-center lg:justify-center lg:justify-center xl:justify-center md:justify-center min-h-[300px]  md:min-h-[400px] lg:min-h-[600px]  rounded-md p-6">
              {isOpen && <ModalLogin/>}
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
                      ).toFixed(3)} đ)`}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-[50px] transition"
                    />
                  </form>
                </div>
              ) : (
                <div className="relative w-full max-w-full bg-white rounded-xl shadow-md p-6">
                  <div className="absolute top-0 left-0 flex space-x-1 p-4">
                    <div className="w-2 h-6 bg-red-600"></div>
                    <div className="w-2 h-6 bg-red-600"></div>
                    <div className="w-2 h-6 bg-red-600"></div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-2xl font-extrabold uppercase text-gray-900">
                      {product.name}
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                      {product.description}
                    </p>

                    <hr className="my-4 border-gray-200" />

                    <h3 className="font-bold text-gray-800 uppercase mb-2">
                      Your Meal
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li>
                        <span className="font-semibold">{product.name}</span>1{" "}
                        {product.name}:
                      </li>
                      <li>
                        1 Drink:
                        <span className="font-semibold">
                          {product.description
                            .split("+")
                            .find(
                              (part) =>
                                part
                                  .toLocaleLowerCase()
                                  .includes("String Can") ===
                                part.toLocaleLowerCase().includes("Pepsi")
                            )}
                        </span>{" "}
                        - ***Standard:
                        <span className="font-bold">STD</span>
                        <span className="inline-block ml-1 text-black">🖉</span>
                      </li>
                    </ul>

                    <hr className="my-4 border-gray-200" />

                    <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            setQuantity((prev) => Math.max(1, prev - 1))
                          }
                          className="w-10 h-10 border rounded-full flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="text-lg font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity((prev) => prev + 1)}
                          className="w-10 h-10 border rounded-full flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={handleClick}
                        className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition text-sm md:text-base"
                      >
                        Add to Bucket ({total_price})đ
                      </button>
                    </div>
                  </div>
                  <br />
                </div>
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
