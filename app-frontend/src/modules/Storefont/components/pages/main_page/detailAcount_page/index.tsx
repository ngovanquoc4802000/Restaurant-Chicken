import Footer from "../../dashboard/footer";
import Header from "../header_page/header";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

function DetailAccountPage() {
  return (
    <div>
      <Header />
      <div className="pt-16 md:pr-0 lg:px-0  md:pt-26 lg:pt-0 lg:pb-0 ">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-0 gap-6 lg:gap-0 xl:mx-[158px]">
          <div className="md:col-span-1 bg-black gap-0 md:bg-black lg:col-span-1 lg:bg-black lg:rounded-b-none">
            <Sidebar />
          </div>
          <div className="md:col-span-2 bg-[#fbf9f7] lg:col-span-2 md:bg-[#fbf9f7]  lg:bg-[#fbf9f7] lg:rounded-md lg:p-[5px]">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailAccountPage;