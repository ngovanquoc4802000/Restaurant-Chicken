// src/components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="admin-panel-title">Admin Panel</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/category">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/dishlist">Dish List</NavLink>
          </li>
          <li className="has-submenu">
            <span className="submenu-title">
              <NavLink to="/user"> Users</NavLink>
            </span>
            <ul className="submenu">
              <li>
                <NavLink to="/user/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/user/register">Register</NavLink>
              </li>
            </ul>
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
