import Sidebar from "$/modules/Storefont/components/pages/main_page/detailAcount_page/sidebar";
import { Outlet } from "react-router-dom";

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
