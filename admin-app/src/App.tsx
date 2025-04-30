import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./components/Category/list";
import AdminLayout from "./components/Layout/AdminLayout";
import OrderList from "./components/Order/OrderList";
import UserList from "./components/User/UserList";
import DishList from "./components/DishList/Dishlist";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path="category" element={<Category />} />
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
