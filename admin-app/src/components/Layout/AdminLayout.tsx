// src/components/Layout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
