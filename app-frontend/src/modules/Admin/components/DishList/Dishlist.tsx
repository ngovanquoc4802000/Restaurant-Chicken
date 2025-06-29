import Button from "$/common/button/button";
import { useEffect } from "react";
import { useDishlist } from "../../hooks/useDishlist";
import DetailDishlist from "./detail";
import DetailById from "./detailbyId";

const DishList = () => {
  const {
    getCategoryName,
    setDishState,
    setIsInfomation,
    handleHideDetail,
    handleHideModal,
    handleEdit,
    handleDetail,
    handleChange,
    handleScrollToCategory,
    refs,
    value,
    dishState,
    dishlist,
    isError,
    sortedDishlist,
    isInfomation,
    isLoading,
  } = useDishlist();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (value.trim() === "") {
        setIsInfomation(false);
        return;
      }
      setIsInfomation(true);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [value, dishlist]);

  if (isLoading || !dishlist) return <div>Loading...</div>;

  if (isError) return <div>Error data</div>;

  if (!dishlist) return <h1>No find a list</h1>;

  const matchedName = dishlist?.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="dish-list-container  rounded-[5px] cursor-pointer">
      <h1 className="text-[#333] p-5 bg-[#dc3545] text-center text-white font-bold text-[1.5rem]">
        Food
      </h1>
      <div className="p-5">
        <div className="flex relative justify-between flex-row-reverse">
          <div className="search">
            <input
              type="text"
              value={value}
              placeholder="Hãy nhập vào đây..."
              onChange={handleChange}
              className="border w-[15rem] italic h-[30px] border border-red-500"
              name=""
              id=""
            />
          </div>
          {isInfomation && (
            <div className="absolute top-[30px] shadow-md bg-[#fff] w-[240px] p-[11px] rounded-[4px]">
              {matchedName.length > 0 ? (
                matchedName.map((item) => (
                  <div
                    className="flex p-[5px] rounded-md hover:bg-red-500 hover:text-white justify-between cursor-pointer"
                    ref={(el) => {
                      if (el) refs.current[item.name] = el;
                    }}
                    key={item.id}
                    onClick={() => handleScrollToCategory(item.name)}
                  >
                    <p>{item.name}</p>
                    <p>X</p>
                  </div>
                ))
              ) : (
                <p>Không tìm thấy kết quả.</p>
              )}
            </div>
          )}
          <Button
            className="bg-[#4caf50] cursor-pointer py-[10px] px-[10px] text-white rounded-[4px]"
            text="+ Create"
            onClick={() => setDishState({ ...dishState, showForm: true })}
          />
        </div>

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
          <thead className="bg-[#dc3545]">
            <tr>
              <th className="border border-solid bg-[#dc3545]  border-gray-300 p-3 text-center text-white font-bold">
                ID
              </th>
              <th className="border border-solid bg-[#dc3545]  border-gray-300 p-3 text-center text-white font-bold">
                IMAGE
              </th>
              <th className="border border-solid bg-[#dc3545]  border-gray-300 p-3 text-center text-white font-bold">
                CATEGORY
              </th>
              <th className="border border-solid bg-[#dc3545]  border-gray-300 p-3 text-center text-white font-bold">
                NAME
              </th>
              <th className="border border-solid bg-[#dc3545]  border-gray-300 p-3 text-center text-white font-bold">
                PRICE
              </th>
              <th className="border border-solid bg-[#dc3545]  border-gray-300 p-3 text-center text-white font-bold">
                DESCRIPTION
              </th>
              <th className="border border-solid bg-[#dc3545]  border-gray-300 p-3 text-center text-white font-bold">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {matchedName &&
              sortedDishlist?.map((dish) => (
                <tr key={dish.id}>
                  <td className="border border-solid border-gray-500 p-3 text-center hover:bg-[#e0f7fa] ">
                    {Number(dish.id)}
                  </td>
                  <td className="border border-solid border-gray-500 p-3 text-center hover:bg-[#e0f7fa]">
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
                  <td className="border border-solid border-gray-500 p-3 text-center hover:bg-[#e0f7fa] ">
                    {getCategoryName(dish.category_id)}
                  </td>
                  <td className="border border-solid border-gray-500 p-3 text-center hover:bg-[#e0f7fa] ">
                    {dish.name}
                  </td>
                  <td className="border border-solid border-gray-500 p-3 text-center hover:bg-[#e0f7fa] ">
                    {dish.price} đ
                  </td>
                  <td className="border border-solid border-gray-500 p-3 text-left hover:bg-[#e0f7fa] ">
                    {dish.description}
                  </td>
                  <td className="border border-solid border-gray-500 p-3 text-left hover:bg-[#e0f7fa]">
                    <Button
                      className="py-[10px] font-bold cursor-pointer px-[17px] m-1 rounded-[4px] text-white bg-blue-500"
                      text="Edit"
                      onClick={() => handleEdit(dish.id)}
                    />
                    <Button
                      className="py-[8px] px-[10px] cursor-pointer rounded-[4px] m-1 text-white font-bold bg-red-500"
                      text="Show"
                      onClick={() => handleDetail(dish.images)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DishList;
