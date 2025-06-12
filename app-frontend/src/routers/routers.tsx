import { createBrowserRouter, Outlet } from "react-router-dom";
import { routerStore } from "./storefront";
import NotFound from "../modules/Storefont/components/pages/notfound";
import { routerAdmin } from "./admin";

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
        {path: "*", Component: NotFound}
       ]
    },
])