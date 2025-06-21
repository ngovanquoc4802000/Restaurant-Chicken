import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { LoginSuccess } from "./common/middleware/authApp";
import { routerRoot } from "./routers/routers";
import { useDispatch } from "react-redux";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: undefined,
    },
  },
});
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");

    if (accessToken && user) {
      dispatch(
        LoginSuccess({
          success: true,
          message: "Restored from localStorage",
          accessToken,
          refreshToken: refreshToken || "",
          data: JSON.parse(user),
        })
      );
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routerRoot} />
    </QueryClientProvider>
  );
}

export default App;
