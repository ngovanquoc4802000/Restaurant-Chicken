import { useEffect, useState } from "react";
import { deleteApiCategory, getApiCategoriesAll } from "../../services/categories";
import { CategoryTs, ValueCategory } from "../../types/categories";
import "./CategoryList.css";
import CreateCategory from "./createCategory";

const CategoryList = () => {
  const [category, setCategory] = useState<CategoryTs[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState<ValueCategory>({
    name: "",
    handle: "",
    image: "",
  });

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const { data } = await getApiCategoriesAll();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        console.log("Initial category fetch completed.");
      }
    };
    fetchDishes();
  }, []);

  const handleShow = () => {
    setShowForm(!showForm);
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteApiCategory(id);
      setCategory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="category-list">
      <h1 style={{ textAlign: "center", fontSize: "28px" }}>Categories</h1>
      <button className="create-button" onClick={handleShow}>
        + Create
      </button>
      {showForm && (
        <CreateCategory
          stateValue={value}
          setValue={setValue}
          setCategory={setCategory}
          stateCategory={category}
          setShowForm={setShowForm}
          onCancel={handleCancel}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>HANDLE</th>
            <th>IMAGE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {category?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.handle}</td>
              <td>
                <img style={{ width: "150px", borderRadius: "4px" }} src={item.image} alt="Hình Ảnh" />
              </td>
              <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button" onClick={() => handleDelete(Number(item.id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
