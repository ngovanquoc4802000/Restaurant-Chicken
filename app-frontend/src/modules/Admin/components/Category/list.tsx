import { useListCategory } from "../../hooks/useListCategory";
import DetailCategory from "./detail";
import DetailStatusCategory from "./detailStatus";

const ListCategory = () => {
  const {
    formState,
    setFormState,
    isLoading,
    error,
    categories,
    handleEditClick,
    handleHideModal,
  } = useListCategory();
  if (isLoading || !categories) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="category-list bg-[#f5f5f5] rounded-[5px]">
      <h1 className="text-center bg-red-800 p-5 text-white font-bold text-2xl text-[#333] mt-0 mb-5">Categories</h1>
      <div className="p-5">
      <button
        className="create-button py-[10px] font-bold px-[15px] cursor-pointer bg-[#4caf50] text-white border-none rounded-[5px] cursor-pointer text-[16px] mb-[20px] hover:bg-[#388e3c]"
        onClick={() => setFormState((prev) => ({ ...prev, showForm: true }))}
      >
        + Create
      </button>
      {formState.showForm && (
        <DetailCategory
          isDetail={formState.isDetail}
          onHideModal={handleHideModal}
        />
      )}
      <table className="w-full mt-2.5 border-collapse">
        <thead>
          <tr className="text-center">
            <th className="bg-red-800 text-white border border-solid border-gray-500 text-[18px] font-bold p-2.5 text-center border border-solid border-gray-200 p-4">
              IMAGE
            </th>
            <th className="bg-red-800 text-white border border-solid border-gray-500 text-[18px] font-bold p-2.5 text-center border border-solid border-gray-200 p-4">
              NAME
            </th>
            <th className="bg-red-800 text-white border border-solid border-gray-500 text-[18px] font-bold p-2.5 text-center border border-solid border-gray-200 p-4">
              HANDLE
            </th>
            <th className="bg-red-800 text-white border border-solid border-gray-500 text-[18px] font-bold p-2.5 text-center border border-solid border-gray-200 p-4">
              STATUS
            </th>
            <th className="bg-red-800 text-white border border-solid border-gray-500 text-[18px] font-bold p-2.5 text-center border border-solid border-gray-200 p-4">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item) => (
            <tr key={item.id}>
              <td className="p-2.5 border border-solid border-gray-500 text-[18px] font-bold text-center border border-solid border-gray-200 p-4 ">
                <img
                  className="w-[150px] rounded-[4px] flex items-center"
                  style={{
                    filter: item.status === false ? "grayscale(100%)" : "none",
                  }}
                  src={item.image}
                  alt="Hình Ảnh"
                />
              </td>
              <td className="p-2.5 border border-solid border-gray-500 text-[18px] font-bold text-center border border-solid border-gray-200 p-4 ">
                {" "}
                {item.name}
              </td>
              <td className="p-2.5 border border-solid border-gray-500 text-[18px] font-bold text-center border border-solid border-gray-200 p-4 ">
                {item.handle}
              </td>
              <td className="p-2.5  p-2 rounded-[4px] border-solid border-gray-500 text-[18px] font-bold text-center border border-solid border-gray-200 p-4 ">
                {item.status ? "current categories" : "categories are sold ou"}
              </td>
              <td className="p-2.5 border border-solid border-gray-500 text-[18px] font-bold border border-solid border-gray-200 p-4 ">
                <button
                  className="py-[6px] mr-1 px-[15px] cursor-pointer rounded-[4px] text-white bg-blue-500 "
                  data-id={item.id}
                  onClick={() => handleEditClick(item.id)}
                >
                  Edit
                </button>
                {/* dòng này có data-id kết hợp với useCallback để không bị rendering */}
                <DetailStatusCategory item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default ListCategory;
