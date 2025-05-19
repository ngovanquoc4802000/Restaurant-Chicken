import { motion } from "framer-motion"
function Order() {
  return (
    <div className="flex-1 px-6">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
      <h1 className="text-3xl font-extrabold uppercase mb-8">ĐƠN HÀNG ĐÃ ĐẶT</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#fbf9f7] p-8 rounded-lg">

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold mb-4">BẮT ĐẦU ĐẶT MÓN!</h2>
            <button className="bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-red-700">
              Bắt đầu đặt hàng
            </button>
          </div>

          <div className="flex justify-center">
            <img src="https://static.kfcvietnam.com.vn/images/web/empty-cart.png?v=5.0" alt="KFC Bucket" className="max-w-full h-auto" />
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default Order;