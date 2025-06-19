import ListCategory from "../../modules/Admin/components/Category/list";
import DishList from "../../modules/Admin/components/DishList/Dishlist";
import AdminLayout from "../../modules/Admin/components/Layout/AdminLayout";
import OrderAdmin from "../../modules/Admin/components/Order/order";
import User from "../../modules/Admin/components/User/user";
export const routerAdmin = [
  {
    path: "admin",
    Component: AdminLayout,
    children: [
      { index: true, path: "category", Component: ListCategory },
      { path: "dishlist", Component: DishList },
      { path: "user", Component: User },
      { path: "order", Component: OrderAdmin },
    ],
  },
];
