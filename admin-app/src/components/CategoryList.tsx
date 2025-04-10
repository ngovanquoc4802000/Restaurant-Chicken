import styles from "../styles/admin.module.css";
interface Button {
  className: string;
  background_color: string;
  padding: string;
  border_radius: string;
  color: string;
}

const button: Button = {
  className: "button_create",
  background_color: "#3f51b5",
  padding: "10px",
  border_radius: "4px",
  color: "#fff",
};
const CategoryList = () => {
  const categories = ["Appetizers", "Main Courses", "Desserts", "Drinks"];
  return (
    <div className={styles.listContainer}>
      <button
        className={button.className}
        style={{
          backgroundColor: button.background_color,
          padding: button.padding,
          borderRadius: button.border_radius,
          color: button.color,
        }}
      >
        + Create
      </button>
      <table className={styles.categoryTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Handle</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category}</td>
              <td>
                <button className={`${styles.actionButton} ${styles.editButton}`}>Edit</button>
                <button className={`${styles.actionButton} ${styles.deleteButton}`}>Delete</button>
              </td>
              <td>{category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Thêm các chức năng quản lý category (thêm, sửa, xóa) ở đây */}
    </div>
  );
};

export default CategoryList;
