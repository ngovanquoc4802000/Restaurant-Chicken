import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./modules/Storefont/components/pages/dashboard";
import Login from "./modules/Storefont/components/pages/authentication/login";
import Register from "./modules/Storefont/components/pages/authentication/register";
import Category from "./modules/Storefont/components/pages/dashboard/category";
import ProductDetail from "./modules/Storefont/components/pages/dashboard/category/details";
import Home from "./modules/Storefont/components/pages/main_page";
import MenuPage from "./modules/Storefont/components/pages/main_page/menu_page";
import DetailsPage from "./modules/Storefont/components/pages/main_page/menu_page/details";
import OrderProduct from "./modules/Storefont/components/pages/orderProduct";
import DetailAccountPage from "./modules/Storefont/components/pages/main_page/detailAcount_page";
import DetailChildren from "./modules/Storefont/components/pages/main_page/detailAcount_page/detailChildren";
import AddressAccount from "./modules/Storefont/components/pages/main_page/detailAcount_page/address";
import OrderFavorites from "./modules/Storefont/components/pages/main_page/detailAcount_page/order_favorites";
import NotFound from "./modules/Storefont/components/pages/notfound";
import Order from "./modules/Storefont/components/pages/main_page/detailAcount_page/order";
import AdminLayout from "./modules/Admin/components/Layout/AdminLayout";
import ListCategory from "./modules/Admin/components/Category/list";
import DishList from "./modules/Admin/components/DishList/Dishlist";
import User from "./modules/Admin/components/User/user";
import OrderAdmin from "./modules/Admin/components/Order/order";
import "./index.css";

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
          <Route index element={<Dashboard />}/>
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

          <Route element={<AdminLayout/>}>
              <Route path="category" element={<ListCategory/>} />
              <Route path="dishlist"  element={<DishList/>}/>
              <Route path="user"  element={<User/>}/>
              <Route path="order"  element={<OrderAdmin/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
