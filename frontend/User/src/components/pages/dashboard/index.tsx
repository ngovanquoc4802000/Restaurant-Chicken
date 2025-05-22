import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useMenuData } from "../../../hooks/useMenuData";
import { MenuContext } from "../contexts/menuContext";
import type { RootState } from "../../../store/store";
import AppDownLoad from "./app-download";
import Footer from "./footer";
import Header from "./header";
import MenuAndMeal from "./menu/menu";
import ModalLogin from "./modal/login";
import OrderOptions from "./oder";
import Carousel from "./slider/carousel";
import "./styles.scss";

function Dashboard() {
  const { category, isLoading, error, findComboGroup } = useMenuData();

  const isOpen = useSelector((state: RootState) => state.loginModal);

  if (isLoading || !category) return <div>Loading...</div>;

  if (error) return "An error has occurred";

  return (
    <div className="Dashboard">
      <Header />
      <OrderOptions />
      <Carousel />
      {isOpen && <ModalLogin />}
      <MenuContext.Provider value={{category,findComboGroup}} >
         <MenuAndMeal/>
      </MenuContext.Provider>
      <AppDownLoad />
      <Outlet />
      <Footer />
    </div >
  );
}

export default Dashboard;
