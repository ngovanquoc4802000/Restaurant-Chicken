import Footer from "../../dashboard/footer";
import Header from "../../dashboard/header";
import "../styles.scss";

function ProductDetail() {
  return ( 
    <div className="productDetail-container">
       <Header/>
       {/* product detail */}
       <Footer/>
    </div>
   );
}

export default ProductDetail;