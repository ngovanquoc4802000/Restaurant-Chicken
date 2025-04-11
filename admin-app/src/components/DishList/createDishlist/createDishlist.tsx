import React, { useState } from "react";
import "./createForm.css";

interface CreateDishFormProps {
  onClose: () => void; // Hàm để đóng form
}

const CreateDishForm = ({ onClose }: CreateDishFormProps) => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("$");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    /* onSave(newDish); */
    onClose(); // Đóng form sau khi lưu
  };

  return (
    <div className="create-dish-form-overlay">
      <div className="create-dish-form">
        <h1 style={{ fontSize: "25px", textAlign: "center" }}>Create New Dish</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category_id" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" title="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="currency">Currency:</label>
            <input type="text" id="currency" name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">
              Save
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDishForm;
