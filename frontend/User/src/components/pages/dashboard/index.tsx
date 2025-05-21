import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { open } from "../features/modal";
import AppDownLoad from "./app-download";
import Footer from "./footer";
import Header from "./header";
import Categories from "./menu/category/category";
import MealSlider from "./menu/dishes/meal";
import ModalLogin from "./modal/login";
import OrderOptions from "./oder";
import Carousel from "./slider/carousel";
import "./styles.scss";
import { useMenuData } from "../../../hooks/useMenuData";

function Dashboard() {

  const { category, isLoading, error, findComboGroup } = useMenuData();

  const isOpen = useSelector((state: RootState) => state.loginModal);

  const dispatch = useDispatch();

  if (isLoading || !category) return <div>Loading...</div>;

  if (error) return "An error has occurred";

  return (
    <div className="Dashboard">
      <Header />
      <OrderOptions />
      <Carousel />
      {isOpen && <ModalLogin />}
      <div className="menuAndMeal">
        <Categories category={category} />
        <MealSlider findComboGroup={findComboGroup} category={category} onClick={() => dispatch(open())} />
      </div>
      <AppDownLoad />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Dashboard;
