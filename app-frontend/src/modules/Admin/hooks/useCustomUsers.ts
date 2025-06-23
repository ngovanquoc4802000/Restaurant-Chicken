import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import queriesUser from "../queries/users";

interface UserStateTs {
  showIsModal: boolean;
  idDetail: number | undefined | null;
}

const initialUserTs: UserStateTs = {
  showIsModal: false,
  idDetail: null,
};

export const useCustomUsers = () => {
  const { isLoading, isError, data: userList } = useQuery({ ...queriesUser.list });

  const [stateUser, setStateUser] = useState<UserStateTs>(initialUserTs);

  const handleEdit = useCallback((id: number | undefined) => {
    setStateUser((prev) => ({ ...prev, showIsModal: true, idDetail: id }));
  }, []);
  return {
    handleEdit,
    isError,
    isLoading,
    userList,
    setStateUser,
    stateUser,
  };
};
