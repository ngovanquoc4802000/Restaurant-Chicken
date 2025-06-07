import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { slugify } from "../ultils/slugify";
import Button from "../../../common/button";
import Footer from "../../footer";
import Header from "../../header";
import ModalLogin from "../../modal/login";
import queriesDishlist from "../../../../../queries/dishlist";

function ProductDetail() {
  const [isActive, setIsActive] = useState(false);

  const { slugProduct } = useParams();

  const {
    isLoading,
    error,
    data: dishlist,
  } = useQuery({ ...queriesDishlist.list });

  const product = dishlist?.find((item) => slugify(item.title) === slugProduct);

  const handleOrderClick = () => {
    setIsActive(true);
  };

  if (isLoading || !dishlist) return <div>Loading...</div>;

  if (error) return `Error Product Details ${error}`;

  if (!product) return <div>Sản phẩm không tồn tại</div>;
  return (
    <div className="productDetail-container cursor-pointer">
      <Header />
      <div className="container mx-auto px-4 mt-20 py-8 xl:pl-[12rem] xl:pr-[12rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 items-start">
          <div className="md:p-4 p-6">
            <div className="product-detail shadow-lg rounded-md p-6 bg-white">
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
          <div className="md:p-4">
            <div className="product-button justify-start mb-[-10rem] md:mb-[0px] lg:mb-[0px] xl:mb-[0px]  flex flex-col items-center lg:justify-center lg:justify-center xl:justify-center md:justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[600px]  rounded-md p-6">
              {isActive && <ModalLogin />}
              <Button onClick={handleOrderClick} className="w-11/12 py-4 px-8 border-none rounded-[50px] text-center text-white bg-[#e4002b] font-bold text-xl cursor-pointer mt-4 hover:bg-[#c90025] transition-colors duration-200" text="Đặt Hàng"/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
