import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Button from "../../../../../../../common/button/button";
import InputValue from "../../../../../../../common/input";
import type { RootState } from "../../../../../store/store";

function DetailChildren() {
  const rule = useSelector((item: RootState) => item.userLogin.rule); 
  const stateLogin = useSelector((items : RootState) => items.updateLogin)
  if(stateLogin === null) return console.log("no find data state login")
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex-1 md:pl-6 md:pr-0 px-6 1 pt-5 md:pt-0 lg:pt-0 xl:pt-0">
          <h1 className="text-3xl  font-extrabold uppercase mb-8">Detail Account</h1>
          <form className="space-y-6 max-w-3xl">
            { rule === "customer" ? (
              <>
              <InputValue classNameLabel="block text-sm font-medium"  text="Your name *" type="text" defaultValue={stateLogin.fullname} classNameInput="mt-1 block w-full border-b border-gray-400 focus:outline-none py-1"/>
              <InputValue classNameLabel="block text-sm font-medium" placeholder="Hãy điền thông tin điện thoại vào đây..." text="Your Telephone *" type="text" defaultValue={stateLogin.phone_number} classNameInput="mt-1 block w-full border-b border-gray-400 focus-outline-none py-1"  />
              <InputValue classNameLabel="block text-sm font-medium"  text="Your Email *" type="email" defaultValue={stateLogin.email} classNameInput="mt-1 block w-full border-b border-gray-400 focus:outline-none py-1 text-gray-400"/>
              <Button text="Update Account" type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold w-full py-3 rounded-full shadow-md" />
              </>
            ) : (
               "" 
            )
            }
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default DetailChildren;
