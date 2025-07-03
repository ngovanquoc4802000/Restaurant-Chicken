import Login from "$/modules/Storefont/components/pages/authentication/login";
import Register from "$/modules/Storefont/components/pages/authentication/register";
import Dashboard from "$/modules/Storefont/components/pages/dashboard";
import Category from "$/modules/Storefont/components/pages/dashboard/category";
import CheckOutPages from "$/modules/Storefont/components/pages/dashboard/category/checkout";
import ProductDetail from "$/modules/Storefont/components/pages/dashboard/category/details";
import OrderProductDashBoard from "$/modules/Storefont/components/pages/dashboard/category/cart";
import Home from "$/modules/Storefont/components/pages/main_page";
import DetailAccountPage from "$/modules/Storefont/components/pages/main_page/detailAcount_page";
import AddressAccount from "$/modules/Storefont/components/pages/main_page/detailAcount_page/address";
import DetailChildren from "$/modules/Storefont/components/pages/main_page/detailAcount_page/detailChildren";
import Order from "$/modules/Storefont/components/pages/main_page/detailAcount_page/order";
import OrderFavorites from "$/modules/Storefont/components/pages/main_page/detailAcount_page/order_favorites";
import MenuPage from "$/modules/Storefont/components/pages/main_page/menu_page";

export const routerStore = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "login/register",
    element: <Register />,
  },
  {
    path: "menu",
    element: <Category />,
  },
  {
    path: "menu/:id",
    element: <Category />,
  },
  {
    path: "menu/:id/:slugProduct",
    element: <ProductDetail />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "menu-page",
    element: <MenuPage />,
  },
  {
    path: "menu-page/:id",
    element: <MenuPage />,
  },
  {
    path: "menu/:id/:slugProduct",
    element: <ProductDetail />,
  },
  {
    path: "cart",
    element: <OrderProductDashBoard />,
  },
  {
    path: "checkout",
    element: <CheckOutPages />,
  },
  {
    path: "/account",
    element: <DetailAccountPage />,
    children: [
      {
        index: true,
        element: <DetailChildren />,
      },
      {
        path: "address",
        element: <AddressAccount />,
      },
      {
        path: "order",
        element: <Order />,
      },

      {
        path: "order_favorites",
        element: <OrderFavorites />,
      },
    ],
  },
];
