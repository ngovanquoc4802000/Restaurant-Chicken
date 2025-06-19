import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import queriesCategories from "../../queries/categories";
import DetailCategory from "./detail";
import DetailStatusCategory from "./detailStatus";
import "./category.scss";

const ListCategory = () => {
  const [formState, setFormState] = useState<{ showForm: boolean; isDetail?: number | undefined | null }>({
    showForm: false,
    isDetail: null,
  });
  const { isLoading, error, data: categories } = useQuery({ ...queriesCategories.list });

  const handleEditClick = useCallback((id: number | undefined) => {
    setFormState((prev) => ({ ...prev, showForm: true, isDetail: id }));
  }, []);

  const handleHideModal = useCallback(() => {
    setFormState((prev) => ({ ...prev, showForm: false, isDetail: null }));
  }, []);

  if (isLoading || !categories) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="category-list">
      <h1 style={{ textAlign: "center", fontSize: "28px" }}>Categories</h1>
      <button className="create-button" onClick={() => setFormState((prev) => ({ ...prev, showForm: true }))}>
        + Create
      </button>
      {formState.showForm && <DetailCategory isDetail={formState.isDetail} onHideModal={handleHideModal} />}
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
          {categories?.map((item) => (
            <tr key={item.id}>
              <td> {item.name}</td>
              <td>{item.handle}</td>
              <td>
                <img
                  style={{
                    width: "150px",
                    borderRadius: "4px",
                    filter: item.status === false ? "grayscale(100%)" : "none",
                  }}
                  src={item.image}
                  alt="Hình Ảnh"
                />
              </td>
              <td>
                <button data-id={item.id} onClick={() => handleEditClick(item.id)}>
                  edit
                </button>
                {/* dòng này có data-id kết hợp với useCallback để không bị rendering */}
                <DetailStatusCategory item={item} />
              </td>
              <td>{item.status ? "True" : "False"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategory;
