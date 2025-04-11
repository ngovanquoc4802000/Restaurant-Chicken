// src/components/Layout/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./AdminLayout.css";

const AdminLayout: React.FC = () => {
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
