import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { routerRoot } from "./routers/routers";

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
       <RouterProvider router={routerRoot} />
    </QueryClientProvider>
  );
}

export default App;
