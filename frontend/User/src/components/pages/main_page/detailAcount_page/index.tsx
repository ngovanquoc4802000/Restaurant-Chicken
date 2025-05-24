import { Outlet } from "react-router-dom";
import Footer from "../../dashboard/footer";
import Header from "../header_page/header";
import Sidebar from "./sidebar";

function DetailAccountPage() {
  return (
    <>
      <Header />
      <div className="pt-36 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Sidebar />
          </div>
          {/* Main Content */}
          <div className="md:col-span-2">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailAccountPage;