import React, { useEffect } from "react";
import { createApiCategory, getApiCategoriesAll, updateCategoryId } from "../../../services/categories";
import { ValueCategory } from "../../../types/categories";
import Button from "../../button/button";

interface CreateTs {
  stateValue: ValueCategory;
  setValue: React.Dispatch<React.SetStateAction<ValueCategory>>;
  stateCategory: ValueCategory[];
  setCategory: React.Dispatch<React.SetStateAction<ValueCategory[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
  onUpdate: (updatedCategory: ValueCategory) => void;
  editingUpdateId: number | null | undefined;
}

const CreateCategory = ({
  stateValue,
  setCategory,
  setShowForm,
  stateCategory,
  setValue,
  onCancel,
  onUpdate,
  editingUpdateId,
}: CreateTs) => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const createOrUpdate = async () => {
      try {
        const { name, handle, image } = stateValue;
        const newCategory: ValueCategory = {
          name,
          handle,
          image,
        };

        if (editingUpdateId !== null && editingUpdateId !== undefined) {
          // Update
          const updatedData = await updateCategoryId(editingUpdateId, newCategory);
          if (updatedData) {
            onUpdate(updatedData);
            const { data } = await getApiCategoriesAll();
            setCategory(data);
          } else {
            console.warn("Update failed.");
          }
        } else {
          // Create
          const createdData = await createApiCategory(newCategory);
          if (createdData) {
            const { data } = await getApiCategoriesAll();
            setCategory(data);
          } else {
            console.warn("Create failed.");
          }
        }
        setValue({ name: "", handle: "", image: "", status: true });
        setShowForm(false);
      } catch (error) {
        console.error("Error during create/update:", error);
      }
    };

    createOrUpdate();
  };
  useEffect(() => {
    console.log("Current category state:", stateCategory);
  }, [stateCategory]);
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="create-dish-form-overlay">
      <div className="create-dish-form">
        <h1 style={{ textAlign: "center" }}>Create New Category</h1>
        <form action="" onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="category">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="...Name"
              id="name"
              onChange={handleOnChangeInput}
              value={stateValue.name}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Handle:</label>
            <input
              type="text"
              name="handle"
              placeholder="...Handle"
              id="handle"
              onChange={handleOnChangeInput}
              value={stateValue.handle}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Image:</label>
            <input
              type="text"
              name="image"
              placeholder="...URL"
              id="image"
              onChange={handleOnChangeInput}
              value={stateValue.image}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">
              {editingUpdateId ? "Update" : "Save"} {/* Hiển thị "Update" khi có `editingUpdateId` */}
            </button>
            <Button
              action="cancel"
              onClick={() => {
                setValue({ name: "", handle: "", image: "", status: true });
                setShowForm(false);
                onCancel(); // gọi thêm nếu cần xử lý ngoài
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
