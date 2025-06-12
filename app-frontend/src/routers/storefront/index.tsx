import Login from "../../modules/Storefont/components/pages/authentication/login";
import Register from "../../modules/Storefont/components/pages/authentication/register";
import Dashboard from "../../modules/Storefont/components/pages/dashboard";
import Category from "../../modules/Storefont/components/pages/dashboard/category";
import ProductDetail from "../../modules/Storefont/components/pages/dashboard/category/details";
import Home from "../../modules/Storefont/components/pages/main_page";
import DetailAccountPage from "../../modules/Storefont/components/pages/main_page/detailAcount_page";
import AddressAccount from "../../modules/Storefont/components/pages/main_page/detailAcount_page/address";
import DetailChildren from "../../modules/Storefont/components/pages/main_page/detailAcount_page/detailChildren";
import Order from "../../modules/Storefont/components/pages/main_page/detailAcount_page/order";
import OrderFavorites from "../../modules/Storefont/components/pages/main_page/detailAcount_page/order_favorites";
import MenuPage from "../../modules/Storefont/components/pages/main_page/menu_page";
import DetailsPage from "../../modules/Storefont/components/pages/main_page/menu_page/details";
import OrderProduct from "../../modules/Storefont/components/pages/orderProduct";

export const routerStore = [
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "login/register",
    Component: Register,
  },
  {
    path: "menu",
    Component: Category,
  },
  {
    path: "menu/:id",
    Component: Category,
  },
  {
    path: "menu/:id/:slugProduct",
    Component: ProductDetail,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "menu-page",
    Component: MenuPage,
  },
  {
    path: "menu-page/:id",
    Component: MenuPage,
  },
  {
    path: "menu-page/:id/:slugProduct",
    Component: DetailsPage,
  },
  {
    path: "orderProduct",
    Component: OrderProduct,
  },
  {
    path: "/account",
    Component: DetailAccountPage,
    children: [
      {
        index: true,
        Component: DetailChildren,
      },
      {
        path: "address",
        Component: AddressAccount,
      },
      {
        path: "order",
        Component: Order,
      },
      {
        path: "order_favorites",
        Component: OrderFavorites,
      },
    ],
  },
];

/*   <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout/>}>
              <Route path="category" element={<ListCategory/>} />
              <Route path="dishlist"  element={<DishList/>}/>
              <Route path="user"  element={<User/>}/>
              <Route path="order"  element={<OrderAdmin/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> */
