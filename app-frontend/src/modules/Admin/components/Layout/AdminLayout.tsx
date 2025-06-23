import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout flex">
      <Sidebar />
      <div className="content ml-[200px] flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
