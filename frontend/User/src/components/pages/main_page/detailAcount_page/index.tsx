import { Outlet } from "react-router-dom";
import Footer from "../../dashboard/footer";
import Header from "../header_page/header";
import Sidebar from "./sidebar";

function DetailAccountPage() {
  return (
    <>
      <Header />
      <div className="flex p-8 pt-36">
        {/* Sidebar chiếm 30% */}
        <div className="basis-[30%]  shrink-0 grow-0">
          <Sidebar />
        </div>
        {/* Content chiếm 70% còn lại */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailAccountPage;