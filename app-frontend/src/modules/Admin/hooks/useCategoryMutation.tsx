import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ValueCategory } from "../types/categories";
import { useCallback } from "react";
import { createApiCategory, updateCategoryId } from "../services/categories";
import queriesCategories from "../queries/categories";

export const useCategoryMutation = (isDetail: number | null | undefined, value: ValueCategory, onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  const isEdit = isDetail != null && typeof isDetail === "number";

  const createOrUpdateCategory = useCallback(async () => {
    const payload = {
      ...value,
      status: !!value.status,
    };

    if (isEdit) {
      return await updateCategoryId(isDetail, payload);
    }
    return await createApiCategory(payload);
  }, [isEdit, isDetail, value]);

  const mutation = useMutation({
    mutationFn: createOrUpdateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queriesCategories.list.queryKey });
      onSuccessCallback();
    },
  });

  return { ...mutation, isEdit };
};
