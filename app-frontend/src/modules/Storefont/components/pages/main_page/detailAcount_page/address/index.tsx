import { motion } from "framer-motion";

function AddressAccount() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="flex-1 px-6  md:h-full">
        <h1 className="text-3xl font-extrabold uppercase mb-8">SAVED SHIPPING ADDRESS</h1>
      </div>
    </motion.div>
  );
}

export default AddressAccount;