import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import queriesCategories from "../../../queries/categories";
import queriesDishlist from "../../../queries/dishlist";
import AppDownLoad from "./app-download";
import Footer from "./footer";
import Header from "./header";
import Categories from "./menu/category/category";
import MealSlider from "./menu/dishes/meal";
import ModalLogin from "./modal/login";
import OrderOptions from "./oder";
import Carousel from "./slider/carousel";
import "./styles.scss";

function Dashboard() {

  const resultQueries = useQueries({
    queries: [
      {
        ...queriesCategories.list,
      },
      {
        ...queriesDishlist.list
      }
    ]
  })
  const category = resultQueries[0].data ?? [];

  const isLoading = resultQueries[0].isLoading;

  const error = resultQueries[0].error;

  const dishlist = resultQueries[1].data ?? [];

  const findComboGroup = dishlist.filter((item) => item.category_id === 5)

  const [isShowModal, setIsShowModal] = useState(false);

  if (isLoading || !category) return <div>Loading...</div>;

  if (error) return "An error has occurred";

  return (
    <div className="Dashboard">
      <Header />
      <OrderOptions />
      <Carousel />
      {isShowModal && <ModalLogin />}
      <div className="menuAndMeal">
        <Categories category={category} />
        <MealSlider findComboGroup={findComboGroup} category={category} onClick={() => setIsShowModal(true)} />
      </div>
      <AppDownLoad />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Dashboard;
