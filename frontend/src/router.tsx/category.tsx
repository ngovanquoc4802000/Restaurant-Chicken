import '../styles/content.scss';
import Showform from "../page/category/showForm";
import { Outlet } from 'react-router-dom';
function Category() {
  return (
    <div className="category" style={{ marginTop: "2rem" }}>
      <Showform />
    </div>
  )
}

export default Category;