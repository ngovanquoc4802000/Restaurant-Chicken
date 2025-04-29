import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import queriesCategories from "../../queries/categories";
import Button from "../button/button";
import "./category.scss";
import DetailQuoc from "./detailQuoc";
import DetailStatus from "./detailStatus";

const ListQuoc = () => {
  /* state show hide form */
  const [showForm, setShowForm] = useState<boolean>(false);
  /* state id details cho trường hợp update */
  const [isDetail, setIdDetail] = useState<number | undefined | null>(null);
  /* lấy dữ liệu từ query key categories */
  const { isLoading, error, data: categories } = useQuery({ ...queriesCategories.list });

  const handleEditClick = (id: number | undefined) => {
    setIdDetail(id);
    setShowForm(true);
  };

  const handleHideModal = () => {
    setShowForm(false);
    setIdDetail(null);
  };
  /* Nếu chưa lấy được dữ liệu thì hiển thị loading */
  if (isLoading || !categories) return <div>Loading...</div>;
  /* nếu api lỗi thì hiển thị error nhé ^^ */
  if (error) return "An error has occured: " + error.message;

  return (
    <div className="category-list">
      <h1 style={{ textAlign: "center", fontSize: "28px" }}>Categories</h1>
      <button className="create-button" onClick={() => setShowForm(true)}>
        + Create
      </button>
      {showForm && <DetailQuoc isDetail={isDetail} onHideModal={handleHideModal} />}
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
          {categories?.map((item, index) => (
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
                    filter: item.status === false ? "grayscale(100%)" : "none",
                  }}
                  src={item.image}
                  alt="Hình Ảnh"
                />
              </td>
              <td>
                <Button action="edit" onClick={() => handleEditClick(item.id)} />
                <DetailStatus item={item} />
              </td>
              <td>{item.status ? "True" : "False"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListQuoc;
