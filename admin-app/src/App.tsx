import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./components/Category/list";
import DishList from "./components/DishList/Dishlist";
import AdminLayout from "./components/Layout/AdminLayout";
import Order from "./components/Order/order";
import OrderList from "./components/Order/OrderList";
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
            <Route path="order_quoc" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
