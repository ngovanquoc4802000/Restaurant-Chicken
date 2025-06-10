import Button from "../../../../common/button/button";
import { useDishlist } from "../../hooks/useDishlist";
import DetailDishlist from "./detail";
import DetailById from "./detailbyId";
import "./Dishlist.scss";

const DishList = () => {
  const {
    getCategoryName,
    setDishState,
    handleHideDetail,
    handleHideModal,
    handleEdit,
    handleDetail,
    dishState,
    isError,
    isLoading,
    dishlist,
    categories,
  } = useDishlist();

  if (isLoading || !dishlist || !categories) return <div>Loading...</div>;

  if (isError) return <div>Error data</div>;

  if (!dishlist) return <h1>Không tìm thấy danh sách</h1>;
  return (
    <div className="dish-list-container">
      <h1>Dish List</h1>

      <Button
        text="create"
        onClick={() => setDishState({ ...dishState, showForm: true })}
      />

      {dishState.showForm && (
        <DetailDishlist
          onHideModal={handleHideModal}
          idDetail={dishState.idDetail}
        />
      )}

      {dishState.showOrder && dishState.selectedDetails && (
        <DetailById
          item={dishState.selectedDetails}
          onHideModal={handleHideDetail}
        />
      )}

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
          {dishlist.map((dish) => (
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
                    img.image ? (
                      <img
                        key={idx}
                        src={img.image}
                        alt={img.alt_text || `dish-image-${idx}`}
                      />
                    ) : null
                  )
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>
                <Button text="edit" onClick={() => handleEdit(dish.id)} />
                <Button
                  text="showDeTails"
                  onClick={() => handleDetail(dish.images)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DishList;
