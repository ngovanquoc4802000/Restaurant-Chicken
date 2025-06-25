import { useEffect, useRef, useState } from "react";
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
  const [value, setValue] = useState<string>("");

  const [isInfomation, setIsInfomation] = useState<boolean>(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (value.trim() === "") {
        setIsInfomation(false);
        return;
      }
      setIsInfomation(true);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [value, categories]);

  const matchedName = categories?.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );
  
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleScrollToCategory = (name: string) => {
    const target = refs.current[name];
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    console.log(target);
    setIsInfomation(false);
    setValue("");
  };

  if (isLoading || !categories || !matchedName) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="category-list bg-[#f5f5f5] rounded-[5px]">
      <h1 className="text-center bg-[#dc3545] focus:outline-none focus:border-red-500 p-5 text-white font-bold text-2xl text-[#333] mt-0 mb-5">
        Categories
      </h1>
      <div className="p-5">
        <div className="flex relative justify-between flex-row-reverse">
          <div className="search">
            <div className="">
              <input
                type="text"
                value={value}
                placeholder="Hãy nhập vào đây..."
                onChange={handleChange}
                className="border w-[15rem] italic h-[30px] border  border-red-500"
                name=""
                id=""
              />
              {isInfomation && (
                <div className="absolute bg-[#fff] w-[240px] p-[11px] rounded-[4px]">
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
            </div>
          </div>
          <button
            className="create-button py-[10px] font-bold px-[15px] cursor-pointer bg-[#4caf50] text-white border-none rounded-[5px] cursor-pointer text-[16px] mb-[20px] hover:bg-[#388e3c]"
            onClick={() =>
              setFormState((prev) => ({ ...prev, showForm: true }))
            }
          >
            + Create
          </button>
        </div>
        {formState.showForm && (
          <DetailCategory
            isDetail={formState.isDetail}
            onHideModal={handleHideModal}
          />
        )}
        <table className="w-full mt-2.5 border-collapse">
          <thead>
            <tr className="text-center">
              <th className="bg-[#dc3545] text-white border border-solid border-gray-300 text-[18px] font-bold p-2.5 text-center border border-solid border-gray-200 p-4">
                IMAGE
              </th>
              <th className="bg-[#dc3545] text-white border border-solid border-gray-300 text-[18px] font-bold p-2.5 text-center border border-solid border-gray-200 p-4">
                NAME
              </th>
              <th className="bg-[#dc3545] text-white border border-solid border-gray-300 text-[18px] font-bold p-2.5 text-center border border-solid border-gray-200 p-4">
                HANDLE
              </th>
              <th className="bg-[#dc3545] text-white border border-solid border-gray-300 text-[18px] font-bold p-2.5 text-center border border-solid border-gray-200 p-4">
                STATUS
              </th>
              <th className="bg-[#dc3545] text-white border border-solid border-gray-300 text-[18px] font-bold p-2.5 text-center border border-solid border-gray-200 p-4">
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
                      filter:
                        item.status === false ? "grayscale(100%)" : "none",
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
                  {item.status
                    ? "current categories"
                    : "categories are sold ou"}
                </td>
                <td className="p-2.5 border border-solid border-gray-500 text-[18px] font-bold border border-solid border-gray-200 p-4 ">
                  {/* dòng này có data-id kết hợp với useCallback để không bị rendering */}
                  <DetailStatusCategory
                    handleEditClick={() => handleEditClick(item.id)}
                    item={item}
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

export default ListCategory;
