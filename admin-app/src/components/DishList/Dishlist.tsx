import { useEffect, useState } from "react";
import { getApiCategoriesAll } from "../../services/categories";
import { getApiDishListAll } from "../../services/dishlist";
import { CategoryTs } from "../../types/categories";
import { DishTs } from "../../types/dishlist";
import Button from "../button/button";
import CreateDishList from "./createDishlist";
import "./DishList.css";

const DishList = () => {
  const [dishes, setDishes] = useState<DishTs[]>([]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [categories, setCategories] = useState<CategoryTs[]>([]);

  const [formData, setFormData] = useState<DishTs>({
    name: "",
    title: "",
    currency: "VND",
    price: "",
    description: "",
    images: [{ alt_text: "", image: "" }],
    category_id: "",
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
    const fetchCategories = async () => {
      try {
        const { data } = await getApiCategoriesAll();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDishes();
    fetchCategories();
  }, []);
  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };
  useEffect(() => {
    console.log("Current dishlist state:", dishes);
  }, [dishes]);
  const getCategoryName = (categoryId: string | number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "undefined category";
  };
  return (
    <div className="dish-list-container">
      <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>Dish List</h1>
      <Button action="create" onClick={handleCreateClick} />
      {showCreateForm && (
        <CreateDishList
          stateSetDishShes={setDishes}
          stateSetFormData={setFormData}
          stateSetCreateForm={setShowCreateForm}
          stateFormData={formData}
          stateCategories={categories}
          onClose={handleCloseForm}
        />
      )}
      {
        <table className="dish-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>CATEGORY</th>
              <th>NAME</th>
              <th>TITLE</th>
              <th>CURRENCY</th>
              <th>PRICE</th>
              <th>DESCRIPTION</th>
              <th>IMAGE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish.id}>
                <td>{dish.id}</td>
                <td>{getCategoryName(dish.category_id)}</td>
                <td>{dish.name}</td>
                <td>{dish.title}</td>
                <td>{dish.currency}</td>
                <td>{dish.price}</td>
                <td>{dish.description}</td>
                <td>
                  {dish.images && dish.images.length > 1 && dish.images[1]?.image ? (
                    <img src={dish.images[1].image} alt={dish.images[1]?.alt_text || ""} />
                  ) : dish.images && dish.images.length > 0 && dish.images[0]?.image ? (
                    <img src={dish.images[0].image} alt={dish.images[0]?.alt_text || ""} />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  <Button action="edit" />
                  <Button action="delete" />
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
