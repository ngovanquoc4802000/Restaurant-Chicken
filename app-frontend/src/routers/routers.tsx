import { createBrowserRouter, Outlet } from "react-router-dom";
import { routerAdmin } from "./admin";
import { routerStore } from "./storefront";
import ForbiddenPage from "$/forbiddenPag";
import NotFound from "$/notfound";

function StorefrontRootLayout() {
  return <Outlet />;
}
export const routerRoot = createBrowserRouter([
  {
    path: "/",
    element: <StorefrontRootLayout />,
    children: [
      ...routerStore,
      ...routerAdmin,
      { path: "403-forbidden", element: <ForbiddenPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
