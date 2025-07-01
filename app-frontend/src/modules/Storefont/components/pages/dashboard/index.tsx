import { useMenuData } from "$/modules/Storefont/hooks/dashboard/useDashboard";
import { MenuContext } from "$/modules/Storefont/contexts/menuContext";
import type { RootState } from "$/modules/Storefont/store/store";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AppDownLoad from "./app-download";
import Footer from "./footer";
import Header from "./header";
import MenuAndMeal from "./menu/menu";
import ModalLogin from "./modal/login";
import OrderOptions from "./oder";
import Carousel from "./slider/carousel";
import "./styles.scss";
import Welcome from "../main_page/welcome";

function Dashboard() {
  const { category, isLoading, error, findComboGroup, isOpen } = useMenuData();

  const [isShow, setIsShow] = useState(false);
  const role = useSelector((state: RootState) => state.userLogin.rule);
  useEffect(() => {
    if (role === "customer") {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [role]);
  if (isLoading || !category) return <div>Loading...</div>;

  if (error) return "An error has occurred";
  return (
    <div className="Dashboard">
      <Header />
      <OrderOptions />
      {isShow && <Welcome />}
      <Carousel />
      {isOpen && <ModalLogin />}
      <MenuContext.Provider value={{ category, findComboGroup }}>
        <MenuAndMeal />
      </MenuContext.Provider>
      <AppDownLoad />
      <Footer />
      <Outlet />
    </div>
  );
}

export default Dashboard;
