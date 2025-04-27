import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import queriesCategories from "../../../queries/categories";
import { createApiCategory, updateCategoryId } from "../../../services/categories";
import { ValueCategory } from "../../../types/categories";
import Button from "../../button/button";

interface CreateTs {
  onHideModal: () => void;
  idDetail: number | null | undefined;
}

const DetailInfo = ({ onHideModal, idDetail }: CreateTs) => {
  // khởi tạo biến lấy dữ liệu query từ global
  const queryClient = useQueryClient();

  // khởi tạo state để lưu lại form khi edit
  const [value, setValue] = useState<ValueCategory>({ name: "", handle: "", image: "", status: true });

  // Lấy dữ liệu chi tiết của category từ queryClient nếu có idDetail
  const categoryDetail = queryClient.getQueryData(queriesCategories.list.queryKey)?.find((item) => item.id === idDetail);

  // Tạo hoặc cập nhật category
  const createOrUpdate = useCallback(async () => {
    if (idDetail !== null && idDetail !== undefined) {
      // Update
      return await updateCategoryId(idDetail, value);
    }

    // Create
    return await createApiCategory(value);
  }, [idDetail, value]);

  // Mutation cập nhật catecate
  const { isPending, mutate: createOrUpdateCategory } = useMutation({
    mutationFn: createOrUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queriesCategories.list.queryKey });
      onHideModal();
    },
    onError: (error) => {
      console.error("Error during create/update:", error);
    },
  });

  // Xử lý sự kiện khi nhập vào input
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cập nhật state khi idDetail thay đổi
  useEffect(() => {
    if (idDetail && categoryDetail) {
      setValue({
        name: categoryDetail.name,
        handle: categoryDetail.handle,
        image: categoryDetail.image,
        status: categoryDetail.status,
      });
    } else {
      setValue({
        name: "",
        handle: "",
        image: "",
        status: true,
      });
    }
  }, [categoryDetail, idDetail]);

  return (
    <div className="create-dish-form-overlay">
      <div className="create-dish-form">
        <h1 style={{ textAlign: "center" }}>{categoryDetail ? "Update Category" : "Create New Category"}</h1>
        <form action="" className="form">
          <div className="form-group">
            <label htmlFor="category">Name:</label>
            <input type="text" name="name" placeholder="...Name" id="name" onChange={handleOnChangeInput} value={value.name} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Handle:</label>
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
            <label htmlFor="category">Image:</label>
            <input type="text" name="image" placeholder="...URL" id="image" onChange={handleOnChangeInput} value={value.image} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button" disabled={isPending} onClick={() => createOrUpdateCategory}>
              {idDetail ? "Update" : "Save"}
              {isPending && <span className="spinner-border spinner-border-sm"></span>}
            </button>
            {!isPending && <Button action="cancel" onClick={() => onHideModal} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailInfo;
