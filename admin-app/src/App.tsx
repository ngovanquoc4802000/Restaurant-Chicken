import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryList from "./components/Category/CategoryList";
import CategorySupperList from "./components/Category/vuongnqCategory/list";
import DishList from "./components/DishList/Dishlist";
import AdminLayout from "./components/Layout/AdminLayout";
import OrderList from "./components/Order/OrderList";
import UserList from "./components/User/UserList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path="category" element={<CategoryList />} />
            <Route path="category-supper" element={<CategorySupperList />} />
            <Route path="dishlist" element={<DishList />} />
            <Route path="user" element={<UserList />} />
            <Route path="order" element={<OrderList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
