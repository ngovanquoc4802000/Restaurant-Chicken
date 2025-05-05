import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import queriesCategories from "../../queries/categories";
import queriesDishlist from "../../queries/dishlist";
import Button from "../button/button";
import DetailDishlist from "./detail";
import "./Dishlist.scss";
import { Image } from "../../types/dishlist";
import DetailById from "./detailbyId";

interface DishlistTs {
  showForm: boolean;
  showOrder: boolean;
  idDetail: number | null | undefined;
  selectedDetails: Image[] | null;
}

const DishList = () => {
  const [dishState, setDishState] = useState<DishlistTs>({
    showForm: false,
    showOrder: false,
    idDetail: null,
    selectedDetails: null,
  });

  const handleEdit = useCallback((id: number | null | undefined) => {
    setDishState((prev) => ({ ...prev, showForm: true, idDetail: id }));
  }, []);

  const handleHideModal = useCallback(() => {
    setDishState((prev) => ({ ...prev, showForm: false, idDetail: null }));
  }, []);

  const handleDetail = useCallback((images: Image[]) => {
    setDishState((prev) => ({ ...prev, showOrder: true, selectedDetails: images }));
  }, []);

  const handleHideDetail = useCallback(() => {
    setDishState((prev) => ({ ...prev, showOrder: false, selectedDetails: null }));
  }, []);

  const { isLoading, isError, data: dishlist } = useQuery({ ...queriesDishlist.list });

  const { data: categories } = useQuery({ ...queriesCategories.list });

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories?.forEach((cat) => map.set(cat.id, cat.name));
    return map;
  }, [categories]);

  const getCategoryName = useCallback((id: string | number) => categoryMap.get(id) || "undefined", [categoryMap]);

  if (isLoading || !dishlist || !categories) return <div>Loading...</div>;

  if (isError) return <div>Error data</div>;

  return (
    <div className="dish-list-container">
      <h1>Dish List</h1>

      <Button action="create" onClick={() => setDishState({ ...dishState, showForm: true })} />

      {dishState.showForm && <DetailDishlist onHideModal={handleHideModal} idDetail={dishState.idDetail} />}

      {dishState.showOrder && dishState.selectedDetails && <DetailById item={dishState.selectedDetails} onHideModal={handleHideDetail} />}

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
                {dish.images && dish.images.length > 0 ? (
                  dish.images.map((img, idx) =>
                    img.image ? <img key={idx} src={img.image} alt={img.alt_text || `dish-image-${idx}`} /> : null
                  )
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>
                <Button action="edit" onClick={() => handleEdit(dish.id)} />
                <Button action="showDetails" onClick={() => handleDetail(dish.images)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DishList;
