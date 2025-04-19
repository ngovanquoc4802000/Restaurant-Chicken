import { getApiDishListAll, postApiDishlist } from "../../../services/dishlist";
import { CategoryTs } from "../../../types/categories";
import { DishTs } from "../../../types/dishlist";
import Button from "../../button/button";
import "./createForm.css";

interface CreateDishTs {
  stateSetDishShes: React.Dispatch<React.SetStateAction<DishTs[]>>;
  stateSetFormData: React.Dispatch<React.SetStateAction<DishTs>>;
  stateSetCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
  stateFormData: DishTs;
  stateCategories: CategoryTs[];
  onClose: () => void;
}

const CreateDishList = ({
  stateSetDishShes,
  stateSetFormData,
  stateSetCreateForm,
  stateFormData,
  stateCategories,
  onClose,
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
        const result = await postApiDishlist(newDish);
        if (result) {
          const { data } = await getApiDishListAll();
          stateSetDishShes(data);
          stateSetCreateForm(false);
          stateSetFormData({
            name: "",
            title: "",
            currency: "VND",
            price: "",
            description: "",
            images: [{ alt_text: "", image: "" }],
            category_id: 0,
          });
        } else {
          console.warn("API create result is empty or undefined");
        }
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
        <h1 style={{ fontSize: "25px", textAlign: "center" }}>Create New Dish</h1>
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
