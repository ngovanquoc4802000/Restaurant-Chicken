import Button from "../../../../../../../common/button/button";
import InputValue from "../../../../../../../common/input";
import { useLoginAdmin } from "../../../../../hooks/dashboard/useLoginAdmin";

function LoginAdmin() {
  const { formData, handleChange, handleSubmit } = useLoginAdmin();
  return (
    <div className="modal-backdrop fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/60 flex justify-center items-center z-[9999]">
     <div className="modal-box bg-white p-6 w-[90%] max-w-[400px] rounded-[8px] text-center">
      <h2 className="text-[18px] font-bold text-black md:text-[20px] font-medium lg:text-[22px]">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <InputValue
          classNameLabel="block text-left font-bold"
          classNameInput="email w-full p-[0.5rem] focus:border-red-700 border-shadow-md outline-none text-black mb-2.5 border border-solid border-gray-300 rounded-[4px]"
          type="email"
          name="email"
          placeholder="email..."
          value={formData.email}
          onChange={handleChange}
        />
        <InputValue
          classNameLabel="block text-left font-bold"
          classNameInput="password w-full text-black focus:border-red-700 outline-none p-[0.5rem] mb-2.5 border border-solid border-gray-300 rounded-[4px]"
          name="password"
          type="password"
          placeholder="Password..."
          onChange={handleChange}
          value={formData.password}
        />
        <Button type="submit" text="Login" />
      </form>
     </div>
    </div>
  );
}

export default LoginAdmin;
