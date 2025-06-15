import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../../../../../../common/button/button";

function Order() {
  return (
    <div className="flex-1 px-6 md:px-0 1 pt-5 md:pt-0 lg:pt-0 xl:pt-0">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-[24px] text-center md:text-[24px] lg:text-[30px] font-extrabold uppercase mb-8">
          ORDER PLACED
        </h1>
        <div className="grid grid-cols-1 md:flex md:flex-col md:grid-cols-2 gap-6 items-center bg-[#fbf9f7] p-8 rounded-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold mb-4">START ORDER!</h2>
            <Link to="/menu">
              <Button  className="bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-red-700"  text="Start order"/>
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src="https://static.kfcvietnam.com.vn/images/web/empty-cart.png?v=5.0"
              alt="KFC Bucket"
              className="max-w-full md:w-[220px] h-auto"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Order;
