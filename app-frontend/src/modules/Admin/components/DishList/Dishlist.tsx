import Button from "$/common/button/button";
import { useDishlist } from "../../hooks/useDishlist";
import DetailDishlist from "./detail";
import DetailById from "./detailbyId";

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

  if (!dishlist) return <h1>No find a list</h1>;
  return (
    <div className="dish-list-container bg-[#f5f5f5] p-5 rounded-[5px] cursor-pointer">
      <h1 className="text-[#333] mt-0 mb-5 text-center text-[1.5rem]">Dish List</h1>

      <Button
      className="bg-[#4caf50] cursor-pointer py-[10px] px-[10px] text-white rounded-[4px]"
        text="+ Create"
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

      <table className="dish-table w-full border-collapse mt-2.5 bg-white shadow-2xl">
        <thead>
          <tr>
            <th className="border border-solid border-gray-500 p-3 text-left bg-[#f0f0f0] font-bold">ID</th>
            <th className="border border-solid border-gray-500 p-3 text-left bg-[#f0f0f0] font-bold">CATEGORY</th>
            <th className="border border-solid border-gray-500 p-3 text-left bg-[#f0f0f0] font-bold">NAME</th>
            <th className="border border-solid border-gray-500 p-3 text-left bg-[#f0f0f0] font-bold">TITLE</th>
            <th className="border border-solid border-gray-500 p-3 text-left bg-[#f0f0f0] font-bold">PRICE</th>
            <th className="border border-solid border-gray-500 p-3 text-left bg-[#f0f0f0] font-bold">DESCRIPTION</th>
            <th className="border border-solid border-gray-500 p-3 text-left bg-[#f0f0f0] font-bold">IMAGE</th>
            <th className="border border-solid border-gray-500 p-3 text-left bg-[#f0f0f0] font-bold">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {dishlist.map((dish) => (
            <tr key={dish.id}>
              <td className="border border-solid border-gray-500 p-3 text-left hover:bg-[#e0f7fa] ">{dish.id}</td>
              <td className="border border-solid border-gray-500 p-3 text-left hover:bg-[#e0f7fa] ">{getCategoryName(dish.category_id)}</td>
              <td className="border border-solid border-gray-500 p-3 text-left hover:bg-[#e0f7fa] ">{dish.name}</td>
              <td className="border border-solid border-gray-500 p-3 text-left hover:bg-[#e0f7fa] ">{dish.title}</td>
              <td className="border border-solid border-gray-500 p-3 text-left hover:bg-[#e0f7fa] ">{dish.price} VND</td>
              <td className="border border-solid border-gray-500 p-3 text-left hover:bg-[#e0f7fa] ">{dish.description}</td>
              <td className="border border-solid border-gray-500 p-3 text-left hover:bg-[#e0f7fa]">
                {dish.images && dish.images.length > 0 ? (
                  dish.images.map((img, idx) =>
                    img.image ? (
                      <img
                      className="w-[50px] h-[50px] mr-1 object-cover rounded-[4px] shadow-md ml-2"
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
              <td className="border border-solid border-gray-500 p-3 text-left hover:bg-[#e0f7fa]">
                <Button className="py-[10px] cursor-pointer px-[35px] m-1 rounded-[4px] text-white bg-blue-500" text="Edit" onClick={() => handleEdit(dish.id)} />
                <Button
                className="py-[8px] px-[10px] cursor-pointer rounded-[4px] m-1 text-white bg-amber-500"
                  text="Show"
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
