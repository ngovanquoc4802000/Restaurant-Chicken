import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCategoryMutation } from "../../hooks/useCategoryMutation";
import type { ValueCategory } from "../../types/categories";
import queriesCategories from "../../queries/categories";
import "./category.scss";
import Button from "../../../../common/button/button";

interface DetailTs {
  onHideModal: () => void;
  isDetail: number | null | undefined;
}

const DetailCategory = ({ isDetail, onHideModal }: DetailTs) => {
  const queryClient = useQueryClient();

  const [value, setValue] = useState<ValueCategory>({
    name: "",
    handle: "",
    image: "",
    status: true,
  });

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { isPending, mutate, isEdit } = useCategoryMutation(isDetail, value, () => {
    setValue({ name: "", handle: "", image: "", status: true });
    onHideModal();
  });

  useEffect(() => {
    if (isEdit && isDetail != null) {
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="create-dish-form-overlay">
      <div className="create-dish-form">
        <h1 style={{ textAlign: "center" }}>{isEdit ? "Edit Category" : "Create New Category"}</h1>
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
            <button type="submit" className="save-button" disabled={isPending}>
              {isEdit ? "Update" : "Save"}
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
