import { useEffect } from "react";
import { useDetailDishlist } from "../../customHook/useDetailDishlist";
import Button from "../common/button/button";
import "./Dishlist.scss";

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
  }, [details, idDetail, isEdit, queryClient, setValue, value]);

  return (
    <div className="create-dish-form-overlay">
      <div className="create-dish-form">
        <h1>Create New Dish</h1>
        {isPending && <h1>Save...</h1>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category_id">Category:</label>
            <select id="category_id" name="category_id" value={value.category_id} onChange={handleInputChange} required>
              <option value={""}>Select Category</option>
              {stateCategory?.map((category) => (
                <option key={category.id} value={String(category.id)}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={value.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" title="title" value={value.title} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="currency">Currency:</label>
            <input type="text" id="currency" name="currency" value={value.currency} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={value.price} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={value.description} onChange={handleInputChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image Link:</label>
            {value.images.map((item, index) => (
              <div className="imageUrl" key={index}>
                <input
                  type="text"
                  name="image"
                  placeholder="...URL"
                  className="image"
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  value={item.image || ""}
                />
                {item.image && <img src={item.image} alt={`Preview ${index}`} />}
              </div>
            ))}
            <button type="button" className="addImage" onClick={addImageField}>
              + Add Image
            </button>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button" disabled={isPending}>
              {idDetail ? "Update" : "Save"}

              {isPending && <span className="spinner-border spinner-border-sm"></span>}
            </button>
            <Button action="cancel" onClick={onHideModal} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default DetailDishlist;
