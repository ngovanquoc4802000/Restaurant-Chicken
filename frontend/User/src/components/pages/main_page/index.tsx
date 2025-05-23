import { useHomePages } from "../../../hooks/useHomePages";
import AppDownLoad from "../dashboard/app-download";
import Footer from "../dashboard/footer";
import Carousel from "../dashboard/slider/carousel";
import Header from "./header_page/header";
import CategoryPage from "./menu_page/category";
import DishShesPage from "./menu_page/dishshes";
import OrderOptionsPage from "./options_page";
import Welcome from "./welcome";

function Home() {
  
  const { category, isLoading, error, findComboGroup } = useHomePages();

  if (isLoading || !category) return <div>Loading...</div>;

  if (error) return "An error has occurred";
  return (
    <div className="Home">
      <Header />
      <OrderOptionsPage/>
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