import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./components/Category/list";
import AdminLayout from "./components/Layout/AdminLayout";
import OrderList from "./components/Order/OrderList";
import DishList from "./components/DishList/Dishlist";
import User from "./components/User/user";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path="category" element={<Category />} />
            <Route path="dishlist" element={<DishList />} />
            <Route path="user" element={<User />} />
            <Route path="order" element={<OrderList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
