import { useEffect, useState } from "react";
import { getApiCategoriesAll, updateCategoryId } from "../../services/categories";
import { ValueCategory } from "../../types/categories";
import Button from "../button/button";
import "./CategoryList.css";
import CreateCategory from "./createCategory";

const CategoryList = () => {
  const [category, setCategory] = useState<ValueCategory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState<ValueCategory>({
    name: "",
    handle: "",
    image: "",
    status: true,
  });
  const [editingUpdateId, setEditingUpdateId] = useState<number | null | undefined>(null);
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
  const handleUpdate = (id: number | undefined) => {
    const categoryFind: ValueCategory | undefined = category.find((item) => item.id === id);
    if (categoryFind) {
      setValue({
        name: categoryFind.name,
        handle: categoryFind.handle,
        image: categoryFind.image,
        status: categoryFind.status ? 1 : 0,
      });
      setEditingUpdateId(id);
      setShowForm(true);
    }
  };
  const onUpdate = (updatedCategory: ValueCategory) => {
    setCategory((prevCategories) => prevCategories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)));
    setShowForm(false);
    setValue({
      name: "",
      handle: "",
      image: "",
    });
  };
  const handleDeactivate = async (id: number | undefined | null) => {
    const findActive: ValueCategory | undefined = category.find((item) => item.id === id);

    if (!findActive) return;

    try {
      const updated = { ...findActive, status: !findActive.status };
      const updatedCategory = await updateCategoryId(id, updated);
      if (updatedCategory) {
        setCategory((prev) => prev.map((cat) => (cat.id === id ? updatedCategory : cat)));
      }
    } catch (error) {
      console.error("Error deactivating category:", error);
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
          onUpdate={onUpdate}
          editingUpdateId={editingUpdateId}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>HANDLE</th>
            <th>IMAGE</th>
            <th>ACTION</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {category?.map((item, index) => (
            <tr
              key={index}
              style={{
                opacity: item.status ? 1 : 0.5,
                backgroundColor: item.status ? "inherit" : "#f0f0f0",
              }}
            >
              <td>{item.name}</td>
              <td>{item.handle}</td>
              <td>
                <img
                  style={{
                    width: "150px",
                    borderRadius: "4px",
                    filter: item.status === false ? "grayscale(100%)" : "none", // hình ảnh chuyển sang xám
                  }}
                  src={item.image}
                  alt="Hình Ảnh"
                />
              </td>
              <td>
                <Button action="edit" onClick={() => handleUpdate(item.id)} />
                <button
                  disabled={item.status === false}
                  onClick={() => handleDeactivate(item.id)}
                  style={{
                    backgroundColor: item.status ? "#dc3545" : "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: item.status ? "pointer" : "not-allowed", // pointer nếu click được
                  }}
                >
                  {item.status ? "Deactivated" : "Deactivate"}
                </button>
              </td>
              <td>{item.status ? "True" : "False"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
