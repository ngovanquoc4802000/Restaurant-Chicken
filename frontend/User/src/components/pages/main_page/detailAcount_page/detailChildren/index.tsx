import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../store/store";
import InputValue from "../../../common/input";

function DetailChildren() {
  const register = useSelector((item: RootState) => item.userRegister);
  const { fullname, phone_number, email } = register;
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex-1 md:pl-6 md:pr-0 px-6 1 pt-5 md:pt-0 lg:pt-0 xl:pt-0">
          <h1 className="text-3xl  font-extrabold uppercase mb-8">
            Chi tiết tài khoản
          </h1>
          <form className="space-y-6 max-w-3xl">
            <div className="">
              <InputValue
               classNameLabel="block text-sm font-medium" 
              text="Tên của bạn *"
               type="text"
               defaultValue={fullname}
               classNameInput="mt-1 block w-full border-b border-gray-400 focus:outline-none py-1"
              />
            </div>

            {/* SĐT */}
            <div className="">
              <label className="block text-sm font-medium">
                Số điện thoại *
              </label>
              <input
                type="text"
                defaultValue={phone_number}
                className="mt-1 block w-full border-b border-gray-400 focus:outline-none py-1"
              />
            </div>

            {/* Email */}
            <div className="">
              <label className="block text-sm font-medium">
                Địa chỉ email của bạn *
              </label>
              <input
                type="email"
                defaultValue={email}
                className="mt-1 block w-full border-b border-gray-400 focus:outline-none py-1 text-gray-400"
                disabled
              />
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
