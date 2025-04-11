import axios from "axios";
import React, { useEffect, useState } from "react";
import "./DishList.css";
import CreateDishForm from "./createDishlist/createDishlist";
import Button from "../button/button";

interface Dish {
  id: number;
  category_id: string;
  name: string;
  title: string;
  currency: string;
  price: number;
  description: string;
  images: string[];
}

const DishList: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = "http://localhost:7777/dishlist";

  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<{
          success: boolean;
          meesage: string;
          data: Dish[];
        }>(apiUrl);
        setDishes(response.data.data);
      } catch (error) {
        setError("Failed to fetch dishes.");
        console.error("Error fetching dishes:", error);
      } finally {
        setLoading(false); // Kết thúc loading dù thành công hay thất bại
      }
    };

    fetchDishes(); // Gọi hàm fetchDishes khi component được mount
  }, [apiUrl]); // Dependency array, useEffect sẽ chạy lại nếu apiUrl thay đổi
  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="dish-list-container">
      <h2>Dish List</h2>
      <Button action="create" onClick={handleCreateClick} />
      {showCreateForm && <CreateDishForm onClose={handleCloseForm} />}
      {loading && <p>Loading DishList...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
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
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DishList;
