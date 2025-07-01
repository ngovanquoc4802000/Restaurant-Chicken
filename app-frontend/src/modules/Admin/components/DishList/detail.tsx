import { useEffect } from "react";
import { useDetailDishlist } from "../../hooks/useDetailDishlist";
import Button from "$/common/button/button";

interface DetailsTs {
  onHideModal: () => void;
  idDetail: number | undefined | null;
}

const DetailDishlist = ({ onHideModal, idDetail }: DetailsTs) => {
  const {
    handleSubmit,
    isPending,
    value,
    setValue,
    queryClient,
    stateCategory,
    details,
    isEdit,
    handleImageChange,
    handleInputChange,
    addImageField,
  } = useDetailDishlist(idDetail, onHideModal);

  useEffect(() => {
    return isEdit && details ? setValue(details) : setValue(value);
  }, [details, idDetail, isEdit, queryClient]);

  return (
    <div className="create-dish-form-overlay fixed top-0 left-0 w-full h-full flex bg-black/50 justify-center items-center z-[1000] ">
      <div className="create-dish-form  bg-white p-[30px] rounded-[8px] shadow-md w-[80%] max-w-[600px] max-h-[90vh] overflow-y-auto">
        <h1 className="text-center text-2xl">Create New Dish</h1>
        {isPending && <h1>Save...</h1>}
        <form className="" onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="block mb-[5px] font-bold text-[#555]" htmlFor="category_id">
              Category:
            </label>
            <select
              className="border border-solid border-gray-700"
              id="category_id"
              name="category_id"
              value={value.category_id}
              onChange={handleInputChange}
              required
            >
              <option value={""}>Select Category</option>
              {stateCategory?.map((category) => (
                <option key={category.id} value={String(category.id)}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="block mb-[5px] font-bold" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              className="w-full p-1.5 border border-solid border-gray-400 rounded-[4px] text-[16px]"
              id="name"
              name="name"
              value={value.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-[5px] font-bold" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              className="w-full p-1.5 border border-solid border-gray-400 rounded-[4px] text-[16px]"
              id="title"
              name="title"
              title="title"
              value={value.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-[5px] font-bold" htmlFor="currency">
              Currency:
            </label>
            <input
              type="text"
              className="w-full p-1.5 border border-solid border-gray-400 rounded-[4px] text-[16px]"
              id="currency"
              name="currency"
              value={value.currency}
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-[5px] font-bold" htmlFor="price">
              Price:
            </label>
            <input
              type="number"
              className="w-full p-1.5 border border-solid border-gray-300 text-[16px]"
              id="price"
              name="price"
              value={value.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-[5px] font-bold" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2.5 border border-solid border-gray-300 rounded-[4px] text-[16px] resize-y"
              value={value.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="block mb-[5px] font-bold" htmlFor="image">
              Image Link:
            </label>
            {value.images.map((item, index) => (
              <div className="imageUrl flex mb-2" key={index}>
                <input
                  type="text"
                  name="image"
                  placeholder="...URL"
                  className="image mr-2 w-full p-1.5 border border-solid border-gray-400 rounded-[4px] text-[16px]"
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  value={item.image || ""}
                />
                {item.image && (
                  <img
                    className="rounded-[4px] w-[60px] h-[60px] object-cover border border-solid border-gray-300"
                    src={item.image}
                    alt={`Preview ${index}`}
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              className="addImage hover:bg-[#007bff] cursor-pointer rounded-[5px] text-white mt-1.5 p-1.5 bg-[#2dde71]"
              onClick={addImageField}
            >
              + Add Image
            </button>
          </div>
          <div className="form-actions flex justify-end gap-2.5 mt-[20px]">
            <button
              type="submit"
              className="save-button cursor-pointer bg-green-600 p-2.5 text-white rounded-[4px] hover:bg-green-400"
              disabled={isPending}
            >
              {idDetail ? "Update" : "Save"}

              {isPending && <span className="spinner-border spinner-border-sm"></span>}
            </button>
            <Button
              className="px-[8px] cursor-pointer py-[10px] rounded-[4px] text-white bg-[#f44336]"
              text="Cancel"
              onClick={onHideModal}
            />
          </div>
        </form>
      </div>
      F
    </div>
  );
};
export default DetailDishlist;
