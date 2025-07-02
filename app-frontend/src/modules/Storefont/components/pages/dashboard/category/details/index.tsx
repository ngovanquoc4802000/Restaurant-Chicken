import { useProductDetailsPage } from "$/modules/Storefont/hooks/dashboard/useProductDetailPages";
import Footer from "../../footer";
import Header from "../../header";
import ModalLogin from "../../modal/login";
import SuccessToast from "../../modal/successToast";

function ProductDetail() {
  const {
    isOpen,
    isLoading,
    isActive,
    error,
    product,
    dishlist,
    setQuantity,
    quantity,
    handleClick,
    total_price,
    showAddToBucketToast,
    /*     orderToastMessage, */
    setShowAddToBucketToast,
    /*     showSuccessOrderToast, */
    addToBucketToastMessage,
  } = useProductDetailsPage();

  if (isLoading || !dishlist) return <div>Loading...</div>;

  if (error) return `Error Product Details ${error}`;

  if (!product) return <div>Product does not exits</div>;

  return (
    <div className="productDetail-container cursor-pointer">
      {showAddToBucketToast && (
        <SuccessToast
          message={addToBucketToastMessage}
          duration={2000}
          onClose={() => setShowAddToBucketToast(false)}
        />
      )}
      <Header />
      <div className="container mx-auto px-4 md:pr-[0px] md:mt-[4rem] md:pb-[0px] md:ml-[3rem] md:mr-[0px] xl:mb-[0px] xl:mt-[0rem] xl:py-0 py-12 xl:pl-[12rem] xl:pr-[12rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 items-center">
          <div className="md:p-4 p-6 md:pl-0  ">
            <div className="product-detail shadow-lg rounded-md p-6 bg-white">
              <div></div>
              <img
                className="rounded-md xl:w-full lg:w-full xl:object-fill w-full h-auto object-cover mb-4"
                src={product.images?.[0]?.image}
                alt={product.title}
              />
            </div>
          </div>
          <div className="md:p-4 md:mt-4  ">
            <div className="product-button mb-[-1rem] justify-start md:p-2  md:mb-[0px] lg:mb-[0px] xl:mb-[0px]  flex flex-col items-center lg:justify-center lg:justify-center xl:justify-center md:justify-center min-h-[300px]  md:min-h-[400px] lg:min-h-[600px]  rounded-md p-6">
              {isOpen && <ModalLogin />}
              {isActive ? (
                <div className="relative w-full max-w-full bg-white rounded-xl shadow-md p-6">
                  <div className="absolute top-0 left-0 flex space-x-1 p-4">
                    <div className="w-2 h-6 bg-red-600"></div>
                    <div className="w-2 h-6 bg-red-600"></div>
                    <div className="w-2 h-6 bg-red-600"></div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-2xl font-extrabold uppercase text-gray-900">{product.name}</h2>
                    <p className="text-gray-500 mt-2 text-sm">{product.description}</p>

                    <hr className="my-4 border-gray-200" />

                    <h3 className="font-bold text-gray-800 uppercase mb-2">Your Meal</h3>
                    <ul className="text-sm space-y-1">
                      <li>
                        <span className="font-semibold">Food: {product.name}</span>
                      </li>
                      <li>
                        1 Drink:
                        <span className="font-semibold">
                          {product.description
                            .split("+")
                            .find(
                              (part) =>
                                part.toLocaleLowerCase().includes("String Can") ===
                                part.toLocaleLowerCase().includes("Pepsi")
                            )}
                        </span>{" "}
                        - ***Standard:
                        <span className="font-bold">STD</span>
                        <span className="inline-block ml-1 text-black">🖉</span>
                      </li>
                    </ul>

                    <hr className="my-4 border-gray-200" />
                    <div className="flex items-center justify-between mt-4 flex-wrap gap-4 ">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
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
              ) : (
                <div className="relative w-full max-w-full bg-white rounded-xl shadow-md p-6">
                  <div className="absolute top-0 left-0 flex space-x-1 p-4">
                    <div className="w-2 h-6 bg-red-600"></div>
                    <div className="w-2 h-6 bg-red-600"></div>
                    <div className="w-2 h-6 bg-red-600"></div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-2xl font-extrabold uppercase text-gray-900">{product.name}</h2>
                    <p className="text-gray-500 mt-2 text-sm">{product.description}</p>

                    <hr className="my-4 border-gray-200" />

                    <h3 className="font-bold text-gray-800 uppercase mb-2">Your Meal</h3>
                    <ul className="text-sm space-y-1">
                      <li>
                        <span className="font-semibold">Food: {product.name}</span>
                      </li>
                      <li>
                        1 Drink:
                        <span className="font-semibold">
                          {product.description.split("+").find((part) => part.toLocaleLowerCase().startsWith("Pepsi"))}
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
                          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
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
                        Add To Bucket ({total_price})đ
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
