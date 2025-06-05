import { Outlet } from "react-router-dom";
import Footer from "../../dashboard/footer";
import Header from "../header_page/header";
import Sidebar from "./sidebar";

function DetailAccountPage() {
  return (
    <>
      <Header />
      <div className="pt-36 px-4 md:px-8 lg:px-8 lg:pt-6 lg:pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-0">
          {/* Sidebar */}
          <div className="md:col-span-1 lg:col-span-1 lg:bg-black lg:rounded">
            <Sidebar />
          </div>
          {/* Main Content */}
          <div className="md:col-span-2 lg:col-span-2 lg:bg-[#fbf9f7] lg:rounded-md lg:p-[5px]">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailAccountPage;