import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import queriesCategories from "../../queries/categories";
import queriesDishlist from "../../queries/dishlist";
import Button from "../button/button";
import DetailDishlist from "./detail";
import "./Dishlist.scss";

const DishList = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [idDetail, setIdDetail] = useState<number | undefined | null>(null);

  const { isLoading, isError, data: dishlist } = useQuery({ ...queriesDishlist.list });

  const { data: categories } = useQuery({ ...queriesCategories.list });

  if (isLoading || !dishlist || !categories) return <div>Loading...</div>;

  if (isError) return <div>Error data</div>;

  const getCategoryName = (id: string | number) => {
    const findName = categories.find((item) => item.id === id);
    return findName ? findName.name : "undefined";
  };

  const handleEdit = (id: number | undefined | null) => {
    setIdDetail(id);
    setShowForm(true);
  };
  const handleHideModal = () => {
    setShowForm(false);
    setIdDetail(null);
  };
  return (
    <div className="dish-list-container">
      <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>Dish List</h1>
      <Button action="create" onClick={() => setShowForm(true)} />
      {showForm && <DetailDishlist onHideModal={handleHideModal} idDetail={idDetail} />}
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
          {dishlist?.map((dish) => (
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
                <Button action="edit" onClick={() => handleEdit(dish.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DishList;
