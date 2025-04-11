import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryList from "./components/Category/CategoryList";
import OrderList from "./components/Order/OrderList";
import UserList from "./components/User/UserList";
import AdminLayout from "./components/Layout/AdminLayout";
import DishList from "./components/DishList/Dishlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="category" element={<CategoryList />} />
          <Route path="dishlist" element={<DishList />} />
          <Route path="user" element={<UserList />} />
          <Route path="order" element={<OrderList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
