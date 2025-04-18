import React, { useEffect, useState } from "react";
import { getApiDishListAll } from "../../services/dishlist";
import { DishTs } from "../../types/dishlist";
import { Request } from "../../utils/http";
import Button from "../button/button";
import "./DishList.css";

const DishList = () => {
  const [dishes, setDishes] = useState<DishTs[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<DishTs>({
    name: "",
    title: "",
    currency: "VND",
    price: "",
    description: "",
    images: [{ alt_text: "", image: "" }],
  });
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const { data } = await getApiDishListAll();
        setDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        console.log(true);
      }
    };
    fetchDishes();
  }, []);
  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const createForm = async () => {
      try {
        const { name, title, currency, price, description, images } = formData;
        const newDish: DishTs = {
          name: name,
          title: title,
          currency: currency,
          price: price,
          description: description,
          images: images,
        };
        const result = await Request.post<DishTs>("dishlist/create", newDish);
        if (result) {
          const { data } = await getApiDishListAll();
          setDishes(data);
          setShowCreateForm(false);
          setFormData({
            name: "",
            title: "",
            currency: "VND",
            price: "",
            description: "",
            images: [{ alt_text: "", image: "" }],
          });
        } else {
          console.warn("API create result is empty or undefined");
        }
      } catch (error) {
        console.log(error);
      }
    };
    createForm();
  };
  useEffect(() => {
    console.log("Current dishlist state:", dishes);
  }, [dishes]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        images: [{ alt_text: "", image: value }],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  return (
    <div className="dish-list-container">
      <h2>Dish List</h2>
      <Button action="create" onClick={handleCreateClick} />
      {showCreateForm && (
        <div className="create-dish-form-overlay">
          <div className="create-dish-form">
            <h1 style={{ fontSize: "25px", textAlign: "center" }}>Create New Dish</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category_id" value={formData.category_id} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" title="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="currency">Currency:</label>
                <input type="text" id="currency" name="currency" value={formData.currency} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image Link:</label>
                <input
                  type="text"
                  name="image"
                  placeholder="...URL"
                  id="image"
                  onChange={handleInputChange}
                  value={formData.images[0]?.image || ""}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button type="button" className="cancel-button" onClick={handleCloseForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {
        <table className="dish-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Name</th>
              <th>Title</th>
              <th>Currency</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish.id}>
                <td>{dish.id}</td>
                <td>{dish.category_id}</td>
                <td>{dish.name}</td>
                <td>{dish.title}</td>
                <td>{dish.currency}</td>
                <td>{dish.price}</td>
                <td>{dish.description}</td>
                <td>
                  <img src={dish.images[1].image} alt="" />
                </td>
                <td>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default DishList;
