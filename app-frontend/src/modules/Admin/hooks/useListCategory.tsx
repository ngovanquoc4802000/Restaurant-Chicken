import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import queriesCategories from "../queries/categories";

export const useListCategory = () => {
  const [formState, setFormState] = useState<{ showForm: boolean; isDetail?: number | undefined | null }>({
    showForm: false,
    isDetail: null,
  });
  const { isLoading, error, data: categories } = useQuery({ ...queriesCategories.list});

  const handleEditClick = useCallback((id: number | undefined) => {
    setFormState((prev) => ({ ...prev, showForm: true, isDetail: id }));
  }, []);

  const handleHideModal = useCallback(() => {
    setFormState((prev) => ({ ...prev, showForm: false, isDetail: null }));
  }, []);

    return {
     formState,
     setFormState,
     isLoading,
     error,
     categories,
     handleEditClick,
     handleHideModal
    }
}