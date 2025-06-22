import { useEffect } from "react";
import queriesUser from "../../queries/users";
import ModalSuccess from "../modal/modalSuccess";
import { useCustomerUsersDetail } from "../../hooks/userCustomUsersDetail";
import Button from "$/common/button/button";

interface UserDetailTs {
  idDetail: number | undefined | null;
  onHideModal: () => void;
}

function UserDetail({ idDetail, onHideModal }: UserDetailTs) {
  const {
    handleChange,
    handleSubmit,
    isPending,
    setValue,
    value,
    showSuccessModal,
    queryClient,
  } = useCustomerUsersDetail(idDetail);

  useEffect(() => {
    if (idDetail !== null && idDetail !== undefined) {
      const foundIdOrder = queryClient.getQueryData(queriesUser.list.queryKey);

      const update = foundIdOrder?.find((item) => item.id === idDetail);

      if (update) {
        setValue({
          fullname: update.fullname,
          email: update.email,
          phone_number: update.phone_number,
          address: update.address,
          password: update.password,
          create_at: update.create_at,
        });
      }
    } else {
      setValue({
        fullname: "",
        email: "",
        phone_number: "",
        address: "",
        password: "",
        create_at: new Date(),
      });
    }
  }, [idDetail, queryClient, setValue]);

  return (
    <form className="form w-[50%]  border border-solid border-gray-950 p-[15px] absolute left-[33%] bg-blue-800 rounded-[4px] top-[8%] border-none" onSubmit={handleSubmit}>
      {showSuccessModal && <ModalSuccess onHideModal={onHideModal} />}

      {isPending && (
        <p className="text-center text-blue-500">Saving...</p>
      )}

      <div className="form-group mb-[15px]">
        <label className="block mb-[5px] font-bold text-white"  htmlFor="fullname">Full Name</label>
        <input
        className="w-full p-[10px]  text-white border border-solid border-gray-400 rounded-[4px] focus:outline focus:border-blue-500"
          type="text"
          id="fullname"
          name="fullname"
          value={value.fullname}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-[15px]">
        <label className="block mb-[5px] font-bold text-white"  htmlFor="email">Email</label>
        <input
        className="w-full p-[10px]  text-white border border-solid border-gray-400 rounded-[4px] focus:outline focus:border-blue-500"
          type="email"
          id="email"
          name="email"
          value={value.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-[15px]">
        <label className="block mb-[5px] font-bold text-white"  htmlFor="phone_number">Phone Number</label>
        <input
        className="w-full p-[10px]  text-white border border-solid border-gray-400 rounded-[4px] focus:outline focus:border-blue-500"
          type="text"
          id="phoneNumber"
          name="phone_number"
          value={value.phone_number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-[15px]">
        <label className="block mb-[5px] font-bold text-white"  htmlFor="address">Address</label>
        <input
        className="w-full p-[10px]  text-white border border-solid border-gray-400 rounded-[4px] focus:outline focus:border-blue-500"
          type="text"
          id="address"
          name="address"
          value={value.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-[15px]">
        <label className="block mb-[5px] font-bold text-white"  htmlFor="password">Password</label>
        <input
        className="w-full p-[10px]  text-white border border-solid border-gray-400 rounded-[4px] focus:outline focus:border-blue-500"
          type="password"
          id="password"
          name="password"
          disabled
          value={value.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="save-button pt-[6px] pr-[10px] pb-[7.5px] pl-[10px] rounded-[4px] m-2 text-white" disabled={isPending}>
        {idDetail ? "Update" : "Save"}
        {isPending && (
          <span className="spinner-border spinner-border-sm"></span>
        )}
      </button>
      <Button className="p-2 rounded-[4px] bg-blue-600 text-white" text="cancel" onClick={onHideModal} />
    </form>
  );
}

export default UserDetail;
