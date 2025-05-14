import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import queriesDishlist from "../../../../queries/dishlist";
import Footer from "../../dashboard/footer";
import Header from "../../dashboard/header";
import { slugify } from "../ultils/slugify";
import "../styles.scss";
import "./details.scss"

function ProductDetail() {
   const { slugProduct } = useParams();

   const { isLoading, error, data: dishlist } = useQuery({ ...queriesDishlist.list });

   const product = dishlist?.find(
      (item) => slugify(item.title) === slugProduct
   );

   if (isLoading || !dishlist) return <div>Loading...</div>
   if (error) return `Error Product Details ${error}`;
   if (!product) return <div>Sản phẩm không tồn tại</div>;
   return (
      <div className="productDetail-container">
         <Header />
         {/* product detail */}
         <div className="container">
            <div className="row">
               <div className="col-lg-6" style={{ padding: "2rem" }}>
                  <div className="product-detail">
                     <img src={product.images?.[0]?.image} alt={product.title} />
                     <h2>{product.title}</h2>
                     <p>{product.description}</p>
                     <span>{product.price}</span>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="product-button">
                     <button>Đặt Hàng</button>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default ProductDetail;