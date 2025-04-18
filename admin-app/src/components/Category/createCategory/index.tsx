import React, { useEffect } from "react";
import { createApiCategory, getApiCategoriesAll } from "../../../services/categories";
import { CategoryTs, ValueCategory } from "../../../types/categories";

interface CreateTs {
  stateValue: ValueCategory;
  setValue: React.Dispatch<React.SetStateAction<ValueCategory>>;
  stateCategory: CategoryTs[];
  setCategory: React.Dispatch<React.SetStateAction<CategoryTs[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
}

const CreateCategory = ({ stateValue, setCategory, setShowForm, stateCategory, setValue, onCancel }: CreateTs) => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const createForm = async () => {
      try {
        const { name, handle, image } = stateValue;
        const newCategory: ValueCategory = {
          name: name,
          handle: handle,
          image: image,
        };
        const result = await createApiCategory(newCategory);
        if (result) {
          const { data } = await getApiCategoriesAll();
          setCategory(data);
          setShowForm(false);
          setValue({ name: "", handle: "", image: "" }); // Reset form after successful creation
        } else {
          console.warn("API create result is empty or undefined. Category not added.");
        }
      } catch (error) {
        console.error("Error creating category:", error);
      }
    };
    createForm();
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
              Save
            </button>
            <button type="submit" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
