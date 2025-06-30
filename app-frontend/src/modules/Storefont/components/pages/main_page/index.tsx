import { MenuContext } from "$/modules/Storefont/contexts/menuContext";
import { useHomePages } from "$/modules/Storefont/hooks/menu_page/useHomePages";
import AppDownLoad from "../dashboard/app-download";
import Footer from "../dashboard/footer";
import OrderOptions from "../dashboard/oder";
import Carousel from "../dashboard/slider/carousel";
import Header from "./header_page/header";
import MenuAndMealPage from "./menu_page/menuParent";
import Welcome from "./welcome";

function Home() {
  const { category, isLoading, error, findComboGroup } = useHomePages();

  if (isLoading || !category) return <div>Loading...</div>;

  if (error) return "An error has occurred";

  return (
    <div className="Home">
      <Header />
      <OrderOptions />
      <Welcome />
      <Carousel />
      <MenuContext.Provider value={{ category, findComboGroup }}>
        <MenuAndMealPage />
      </MenuContext.Provider>
      <AppDownLoad />
      <Footer />
    </div>
  );
}

export default Home;
