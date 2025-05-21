import Header from "./header_page/header";
import Footer from "../dashboard/footer";
import OrderOptions from "../dashboard/oder";
import Carousel from "../dashboard/slider/carousel";
import CategoryPage from "./menu_page/category";
import DishShesPage from "./menu_page/dishshes";
import queriesCategories from "../../../queries/categories";
import queriesDishlist from "../../../queries/dishlist";
import AppDownLoad from "../dashboard/app-download";
import Welcome from "./welcome";
import { useQueries } from "@tanstack/react-query";

function Home() {
  const resultQueries = useQueries({
    queries: [
      {
        ...queriesCategories.list,
      },
      {
        ...queriesDishlist.list
      }
    ]
  });
  const category = resultQueries[0].data ?? [];

  const isLoading = resultQueries[0].isLoading;

  const error = resultQueries[0].error;

  const dishlist = resultQueries[1].data ?? [];

  const findComboGroup = dishlist.filter((item) => item.category_id === 5)


  if (isLoading || !category) return <div>Loading...</div>;

  if (error) return "An error has occurred";
  return (
    <div className="Home">
      <Header />
      <OrderOptions />
      <Welcome />
      <Carousel />
      <div className="menuAndMeal">
        <CategoryPage category={category} />
        <DishShesPage findComboGroup={findComboGroup} category={category} />
      </div>
      <AppDownLoad />
      <Footer />
    </div>
  );
}

export default Home;