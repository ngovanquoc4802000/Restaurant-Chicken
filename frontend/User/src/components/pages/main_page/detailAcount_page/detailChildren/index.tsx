import { motion } from "framer-motion";

function DetailChildren() {
  return (
    <div>
      <motion.div
       initial={{ opacity: 0, x: 100 }}
       animate={{ opacity: 1, x: 0}}
       transition={{ duration: 1, ease:"easeOut" }}
      >
      <div className="flex-1 md:pl-6 md:pr-0 px-6 1 pt-5 md:pt-0 lg:pt-0 xl:pt-0">
        <h1 className="text-3xl md:mb-0 font-extrabold uppercase mb-8">Chi tiết tài khoản</h1>
        <form className="space-y-6 max-w-3xl">
            <input
              type="text"
              defaultValue="Van Quoc"
              className="mt-1 md:mb-2 block w-full border-b border-gray-400 focus:outline-none py-1"
            />
          <div className="md:mb-2">
            <label className="block text-sm font-medium">Tên của bạn *</label>
            <input
              type="text"
              defaultValue="Ngo"
              className="mt-1 block w-full border-b border-gray-400 focus:outline-none py-1"
            />
          </div>

          {/* SĐT */}
          <div className="md:mb-2">
            <label className="block text-sm font-medium">Số điện thoại *</label>
            <input
              type="text"
              className="mt-1 block w-full border-b border-gray-400 focus:outline-none py-1"
            />
          </div>

          {/* Email */}
          <div className="md:mb-2">
            <label className="block text-sm font-medium">Địa chỉ email của bạn *</label>
            <input
              type="email"
              defaultValue="ngovanquoc480@gmail.com"
              className="mt-1 block w-full border-b border-gray-400 focus:outline-none py-1 text-gray-400"
              disabled
            />
          </div>

          {/* Giới tính */}
          <div>
            <label className="block text-sm font-medium">Giới tính *</label>
            <select className="mt-1 w-full border-b border-gray-400 py-1 bg-transparent focus:outline-none">
              <option value="">Chọn</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          {/* Ngày sinh */}
          <div className="md:mb-2">
            <label className="block text-sm  font-medium mb-2">
              Ngày sinh của bạn (tùy chọn)
            </label>
            <div className="grid grid-cols-3 gap-4">
              <select className="border-b border-gray-400 py-1 bg-transparent focus:outline-none">
                <option>Ngày</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
              <select className="border-b border-gray-400 py-1 bg-transparent focus:outline-none">
                <option>Tháng</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
              <select className="border-b border-gray-400 py-1 bg-transparent focus:outline-none">
                <option>Năm</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i}>{2025 - i}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold w-full py-3 rounded-full shadow-md"
            >
              Cập nhật tài khoản
            </button>
          </div>
        </form>
      </div>
      </motion.div>
    </div>
  );
}

export default DetailChildren;