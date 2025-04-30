import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./layout.scss";

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
