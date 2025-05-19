import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { slugify } from "../ultils/slugify";
import queriesDishlist from "../../../../queries/dishlist";
import Footer from "../../dashboard/footer";
import Header from "../../dashboard/header";
import ModalLogin from "../../dashboard/modal/login";
import Button from "../../button";

function ProductDetail() {

   const [isActive, setIsActive] = useState(false);

   const { slugProduct } = useParams();

   const { isLoading, error, data: dishlist } = useQuery({ ...queriesDishlist.list });

   const product = dishlist?.find(
      (item) => slugify(item.title) === slugProduct
   );

   const handleOrderClick = () => {
      setIsActive(true)
   }

   if (isLoading || !dishlist) return <div>Loading...</div>

   if (error) return `Error Product Details ${error}`;

   if (!product) return <div>Sản phẩm không tồn tại</div>;

   return (
      <div className="productDetail-container cursor-pointer">
         <Header />
         {/* product detail */}
         <div className="container mx-auto ">
            <div className="grid xl:grid-cols-2">
               <div className="col-lg-6" style={{ padding: "2rem" }}>
                  <div className="product-detail shadow-[0_0_8px_0_rgba(0, 0, 0, 0.2)] rounded-md p-6">
                     <img className="rounded-md w-full" src={product.images?.[0]?.image} alt={product.title} />
                     <h2>{product.title}</h2>
                     <p>{product.description}</p>
                     <span>{product.price}</span>
                  </div>
                  {isActive && (
                     <>
                        <button>Thêm</button>
                        <button>Tùy chỉnh</button>
                     </>
                  )}
               </div>
               <div className="col-lg-6">
                  <div className="product-button flex items-center justify-center items-center min-h-[600px] bg-blue">
                     {
                        isActive && <ModalLogin />
                     }
                     <Button onClick={handleOrderClick} className="w/9/12 p-6 border-none rounded-[50px] text-center text-amber-950 bg-[#e4002b] font-bold text-white m-auto cursor-pointer" text="Đặt Hàng" />
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default ProductDetail;