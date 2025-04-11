// src/components/Category/CategoryList.tsx
import React from "react";
import "./CategoryList.css";

const CategoryList: React.FC = () => {
  return (
    <div className="category-list">
      <h2>Categories</h2>
      <button className="create-button">+ Create</button>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>HANDLE</th>
            <th>IMAGE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Appetizers</td>
            <td>
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </td>
            <td>Appetizers</td>
          </tr>
          <tr>
            <td>Main Courses</td>
            <td>
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </td>
            <td>Main Courses</td>
          </tr>
          <tr>
            <td>Desserts</td>
            <td>
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </td>
            <td>Desserts</td>
          </tr>
          <tr>
            <td>Drinks</td>
            <td>
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </td>
            <td>Drinks</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
