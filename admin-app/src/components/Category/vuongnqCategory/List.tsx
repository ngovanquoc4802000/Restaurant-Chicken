import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import queriesCategories from "../../../queries/categories";
import Button from "../../button/button";
import "../category.scss";
import UpdateStatusDetail from "./DetailStatus";
import DetailInfo from "./detail";

const CategoryList = () => {
  // state show hide form
  const [showForm, setShowForm] = useState(false);

  // state id detail cho truong hợp update
  const [idDetail, setIdDetail] = useState<number | null | undefined>(null);

  // lấy dữ liệu từ query key categories
  const { isLoading, data: category } = useQuery({ ...queriesCategories.list });

  // nếu chưa lấy được dữ liệu thì hiển thị loading
  if (isLoading || !category) return <div>Loading...</div>;

  return (
    <div className="category-list">
      <h1 style={{ textAlign: "center", fontSize: "28px" }}>Categories</h1>
      <button className="create-button" onClick={() => setShowForm(true)}>
        + Create
      </button>
      {showForm && <DetailInfo onHideModal={() => setShowForm(false)} idDetail={idDetail} />}
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
          {category.map((item, index) => (
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
                <Button action="edit" onClick={() => setIdDetail(item.id)} />
                <UpdateStatusDetail idDetail={idDetail} />
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
