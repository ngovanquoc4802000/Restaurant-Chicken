import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { postApiDishlist, updateApiDishList } from "../services/dishlist";
import queriesCategories from "../queries/categories";
import queriesDishlist from "../queries/dishlist";
import type { DishTs } from "../types/dishlist";

const initialState: DishTs = {
  name: "",
  title: "",
  currency: "VND",
  price: "",
  description: "",
  images: [{ alt_text: "", image: "" }],
  category_id: "",
};
export const useDetailDishlist = (idDetail: number | undefined | null, onHideModal: () => void) => {
  const [value, setValue] = useState<DishTs>(initialState);

  const queryClient = useQueryClient();

  const { data: stateCategory } = useQuery({ ...queriesCategories.list, enabled: true });

  const { data: details } = useQuery(queriesDishlist.detail(idDetail));

  const isEdit = idDetail !== null && idDetail !== undefined;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createOrUpdateDishList();
  };

  const createOrUpdate = useCallback(async () => {
    return isEdit && typeof idDetail === "number" ? await updateApiDishList(idDetail, value) : await postApiDishlist(value);
  }, [isEdit, value, idDetail]);

  const { isPending, mutate: createOrUpdateDishList } = useMutation({
    mutationFn: createOrUpdate,

    onSuccess: (data: DishTs) => {
      queryClient.invalidateQueries({ queryKey: queriesDishlist.list.queryKey });

      queryClient.setQueryData(queriesDishlist.list.queryKey, (update: DishTs[] | undefined | null) => {
        if (!update) return [];

        return update.map((item) => (item.id === idDetail ? { ...item, ...data } : item));
      });

      if (idDetail) {
        queryClient.setQueryData(queriesDishlist.detail(idDetail).queryKey, data);
      }
      setValue(value);

      onHideModal();
    },
    onError: (error: string) => {
      console.error("Error during create/update", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (id: number, newValue: string) => {
    setValue((prev) => {
      const updateImages = [...prev.images];

      updateImages[id] = { alt_text: "", image: newValue };

      return { ...prev, images: updateImages };
    });
  };

  const addImageField = () => {
    setValue((prev) => ({
      ...prev,
      images: [...prev.images, { alt_text: "", image: "" }],
    }));
  };

  return {
    isPending,
    handleSubmit,
    handleImageChange,
    addImageField,
    handleInputChange,
    setValue,
    value,
    queryClient,
    stateCategory,
    details,
    isEdit,
  };
};
