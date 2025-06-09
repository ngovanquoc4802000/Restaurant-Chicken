import { useCallback, useState } from "react";
import { UsersTs } from "../types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queriesUser from "../queries/users";
import { updateUser } from "../services/users";

export const useCustomerUsersDetail = (idDetail: number | null | undefined) => {
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return {
    handleChange,
    handleSubmit,
    isPending,
    setShowSuccessModal,
    setValue,
    showSuccessModal,
    value,
    queryClient,
  };
};
