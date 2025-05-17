import { Outlet } from "react-router-dom";
import Footer from "../../dashboard/footer";
import Header from "../header_page/header";
import Sidebar from "./sidebar";

function DetailAccountPage() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-white flex flex-col pt-[10rem] pb-[4rem] px-[8rem]">
      <div className="content grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}

export default DetailAccountPage;