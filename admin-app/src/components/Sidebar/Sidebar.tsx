import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="admin-panel-title">Admin Panel</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/category-quoc">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/dishlist">Dish List</NavLink>
          </li>
          <li>
            <NavLink to="/user">User</NavLink>
          </li>
          <li>
            <NavLink to="/order">Orders</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
