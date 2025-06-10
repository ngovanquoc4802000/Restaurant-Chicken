import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./modules/FrontStore/components/pages/dashboard";
import Login from "./modules/FrontStore/components/pages/authentication/login";
import Register from "./modules/FrontStore/components/pages/authentication/register";
import Category from "./modules/FrontStore/components/pages/dashboard/category";
import ProductDetail from "./modules/FrontStore/components/pages/dashboard/category/details";
import Home from "./modules/FrontStore/components/pages/main_page";
import MenuPage from "./modules/FrontStore/components/pages/main_page/menu_page";
import DetailsPage from "./modules/FrontStore/components/pages/main_page/menu_page/details";
import OrderProduct from "./modules/FrontStore/components/pages/orderProduct";
import DetailAccountPage from "./modules/FrontStore/components/pages/main_page/detailAcount_page";
import DetailChildren from "./modules/FrontStore/components/pages/main_page/detailAcount_page/detailChildren";
import AddressAccount from "./modules/FrontStore/components/pages/main_page/detailAcount_page/address";
import OrderFavorites from "./modules/FrontStore/components/pages/main_page/detailAcount_page/order_favorites";
import NotFound from "./modules/FrontStore/components/pages/notfound";
import Order from "./modules/FrontStore/components/pages/main_page/detailAcount_page/order";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: undefined,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="login/:id" element={<Register />} />
          <Route path="menu" element={<Category />} />
          <Route path="menu/:id" element={<Category />} />
          <Route path="menu/:id/:slugProduct" element={<ProductDetail />} />

          <Route path="/home" element={<Home />} />
          <Route path="menu-page" element={<MenuPage />} />
          <Route path="menu-page/:id" element={<MenuPage />} />
          <Route path="menu-page/:id/:slugProduct" element={<DetailsPage />} />

          <Route path="orderProduct" element={<OrderProduct />} />

          <Route path="/account" element={<DetailAccountPage />}>
            <Route index element={<DetailChildren />} />
            <Route path="address" element={<AddressAccount />} />
            <Route path="order" element={<Order />} />
            <Route path="order_favorites" element={<OrderFavorites />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
