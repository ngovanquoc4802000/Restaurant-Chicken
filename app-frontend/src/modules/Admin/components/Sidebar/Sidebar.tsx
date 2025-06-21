import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar bg-[#303f9f] text-white w-[200px] h-[100vh] fixed top-0 left-0 pt-[20px]">
      <div className="admin-panel-title p-5 text-[1.5em] font-bold text-left">Admin Panel</div>
      <nav>
        <ul className="list-none p-0 m-0 `">
          <li>
            <NavLink className="block p-[1.2rem] decoration-none text-white text-left transition-colors duration-300 ease-in-out  hover:bg-blue-700 " to="category">Categories</NavLink>
          </li>
          <li>
            <NavLink className="block p-[1.2rem] decoration-none text-white text-left transition-colors duration-300 ease-in-out  hover:bg-blue-700 " to="dishlist">Dish List</NavLink>
          </li>
          <li>
            <NavLink className="block p-[1.2rem] decoration-none text-white text-left transition-colors duration-300 ease-in-out  hover:bg-blue-700 " to="user">User</NavLink>
          </li>
          <li>
            <NavLink className="block p-[1.2rem] decoration-none text-white text-left transition-colors duration-300 ease-in-out  hover:bg-blue-700 " to="order">Orders</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
