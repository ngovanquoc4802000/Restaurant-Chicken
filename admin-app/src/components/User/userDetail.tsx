import { useCallback, useEffect, useState } from "react";
import { UsersTs } from "../../types/users";
import { updateUser } from "../../services/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../button/button";
import queriesUser from "../../queries/users";
import "./user.scss";
import ModalSuccess from "../modal/modalSuccess";

interface UserDetailTs {
  idDetail: number | undefined | null;
  onHideModal: () => void;
}

function UserDetail({ idDetail, onHideModal }: UserDetailTs) {
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const [value, setValue] = useState<UsersTs>({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    create_at: new Date(),
  });

  const queryClient = useQueryClient();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    UpdateOrSave();
  };

  const update = useCallback(async () => {
    return idDetail !== null && idDetail !== undefined ? await updateUser(idDetail, value) : "No idDetail";
  }, [idDetail, value]);

  const { isPending, mutate: UpdateOrSave } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      setShowSuccessModal(true);
      queryClient.invalidateQueries({ queryKey: queriesUser.list.queryKey });
    },
    onError: (error) => {
      console.log("Error dupting update" + error);
    },
  });

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
  }, [idDetail, queryClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      {showSuccessModal && <ModalSuccess onHideModal={onHideModal} />}

      {isPending && <p style={{ textAlign: "center", color: "blue" }}>Saving...</p>}

      <div className="form-group">
        <label htmlFor="fullname">Full Name</label>
        <input type="text" id="fullname" name="fullname" value={value.fullname} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={value.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="phone_number">Phone Number</label>
        <input type="text" id="phoneNumber" name="phone_number" value={value.phone_number} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" value={value.address} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" disabled value={value.password} onChange={handleChange} />
      </div>
      <button type="submit" className="save-button" disabled={isPending}>
        {idDetail ? "Update" : "Save"}
        {isPending && <span className="spinner-border spinner-border-sm"></span>}
      </button>
      <Button action="cancel" onClick={onHideModal} />
    </form>
  );
}

export default UserDetail;
