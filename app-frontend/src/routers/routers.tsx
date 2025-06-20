import { createBrowserRouter, Outlet } from "react-router-dom";
import { routerStore } from "./storefront";
import NotFound from "../notfound";
import { routerAdmin } from "./admin";
import ForbiddenPage from "../forbiddenPag";

function StorefrontRootLayout() {
  return <Outlet />;
}
export const routerRoot = createBrowserRouter([
  {
    path: "/",
    Component: StorefrontRootLayout,
    children: [
      ...routerStore,
      ...routerAdmin,
      { path: "403-forbidden", Component: ForbiddenPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
