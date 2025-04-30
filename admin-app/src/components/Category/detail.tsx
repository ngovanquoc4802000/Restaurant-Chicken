import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { createApiCategory, updateCategoryId } from "../../services/categories";
import { ValueCategory } from "../../types/categories";
import queriesCategories from "../../queries/categories";
import Button from "../button/button";
import "./category.scss";

interface DetaiTs {
  onHideModal: () => void;
  isDetail: number | null | undefined;
}

const DetailCategory = ({ isDetail, onHideModal }: DetaiTs) => {
  /* khởi tạo biến lấy dữ liệu từ global */
  const queryClient = useQueryClient();
  /* khởi tạo state để lưu lại form khi edit */
  const [value, setValue] = useState<ValueCategory>({ name: "", handle: "", image: "", status: true });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOrUpdateCategory();
  };

  const isEdit = isDetail !== null && isDetail !== undefined;

  const createOrUpdate = useCallback(async () => {
    const payload = {
      ...value,
      status: value.status ? true : false,
    };
    if (isEdit && typeof isDetail === "number") {
      return await updateCategoryId(isDetail, payload);
    }
    return await createApiCategory(payload);
  }, [isEdit, isDetail, value]);

  const { isPending, mutate: createOrUpdateCategory } = useMutation({
    mutationFn: createOrUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queriesCategories.list.queryKey });
      setValue({ name: "", handle: "", image: "", status: true });
      onHideModal();
    },
    onError: (error) => {
      console.error("Error during create/update", error);
    },
  });

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (isEdit && isDetail != null) {
      /* tìm id của edit trong này  */
      const list = queryClient.getQueryData<ValueCategory[]>(queriesCategories.list.queryKey);
      const foundCategory = list?.find((item) => item.id === isDetail);
      if (foundCategory) {
        setValue({
          name: foundCategory.name,
          handle: foundCategory.handle,
          image: foundCategory.image,
          status: foundCategory.status,
        });
      }
    } else {
      setValue({
        name: "",
        handle: "",
        image: "",
        status: true,
      });
    }
  }, [isEdit, queryClient, isDetail]);

  return (
    <div className="create-dish-form-overlay">
      <div className="create-dish-form">
        <h1 style={{ textAlign: "center" }}>{isDetail ? "Edit Category" : "Create New Category"}</h1>
        {isPending && <p style={{ textAlign: "center", color: "blue" }}>Saving...</p>}

        <form className="form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" placeholder="...Name" id="name" onChange={handleOnChangeInput} value={value.name} required />
          </div>
          <div className="form-group">
            <label htmlFor="handle">Handle:</label>
            <input
              type="text"
              name="handle"
              placeholder="...Handle"
              id="handle"
              onChange={handleOnChangeInput}
              value={value.handle}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input type="text" name="image" placeholder="...URL" id="image" onChange={handleOnChangeInput} value={value.image} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button" disabled={isPending} onClick={() => createOrUpdateCategory}>
              {isDetail ? "Update" : "Save"}
              {isPending && <span className="spinner-border spinner-border-sm"></span>}
            </button>
            <Button action="cancel" onClick={onHideModal} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailCategory;
