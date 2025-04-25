import { getApiDishListAll, postApiDishlist, updateApiDishList } from "../../../services/dishlist";
import { ValueCategory } from "../../../types/categories";
import { DishTs } from "../../../types/dishlist";
import Button from "../../button/button";
import "./styles.css";

interface CreateDishTs {
  stateSetDishShes: React.Dispatch<React.SetStateAction<DishTs[]>>;
  stateSetFormData: React.Dispatch<React.SetStateAction<DishTs>>;
  stateSetCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
  stateFormData: DishTs;
  stateCategories: ValueCategory[];
  onClose: () => void;
  onUpdate: (updateDish: DishTs) => void;
  editUpdateId: number | null | undefined;
  resetForm: () => void;
}

const CreateDishList = ({
  stateSetDishShes,
  stateSetFormData,
  stateFormData,
  stateCategories,
  onClose,
  onUpdate,
  editUpdateId,
  resetForm,
}: CreateDishTs) => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const createForm = async () => {
      try {
        const { name, title, currency, price, description, images, category_id } = stateFormData;
        const newDish: DishTs = {
          name,
          title,
          currency,
          price,
          description,
          images,
          category_id,
        };
        if (editUpdateId !== undefined && editUpdateId !== null) {
          const update = await updateApiDishList(editUpdateId, newDish);
          if (update) {
            onUpdate(update);
            const { data } = await getApiDishListAll();
            stateSetDishShes(data);
          } else {
            console.warn("Update dish Failed.");
          }
        } else {
          const result = await postApiDishlist(newDish);
          if (result) {
            const { data } = await getApiDishListAll();
            stateSetDishShes(data);
          } else {
            console.warn("API create result is empty or undefined");
          }
        }
        resetForm();
      } catch (error) {
        console.log(error);
      }
    };
    createForm();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "image") {
      stateSetFormData((prev) => ({
        ...prev,
        images: [{ alt_text: "", image: value }],
      }));
    } else if (name === "category_id") {
      stateSetFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      stateSetFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  return (
    <div className="create-dish-form-overlay">
      <div className="create-dish-form">
        <h1>Create New Dish</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category_id">Category:</label>
            <select id="category_id" name="category_id" value={stateFormData.category_id} onChange={handleInputChange} required>
              <option value={0}>Select Category</option> {/* Giá trị mặc định */}
              {stateCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={stateFormData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" title="title" value={stateFormData.title} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="currency">Currency:</label>
            <input type="text" id="currency" name="currency" value={stateFormData.currency} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={stateFormData.price} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={stateFormData.description} onChange={handleInputChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image Link:</label>
            <input
              type="text"
              name="image"
              placeholder="...URL"
              id="image"
              onChange={handleInputChange}
              value={stateFormData.images[0]?.image || ""}
              required
            />
          </div>
          <div className="form-actions">
            <Button action="save" />
            <Button action="cancel" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDishList;
