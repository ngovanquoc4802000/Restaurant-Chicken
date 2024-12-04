import { Route, Routes } from "react-router-dom";
import Home from "./component/home/home";
import Category from "./component/category/category";
import Dishlist from "./component/dishlist/dishlist";
import User from "./component/user/user";
import Order from "./component/order/order";
import NavBar from "./component/Navbar";
import NotFound from "./component/error/error";
import CreateCategory from "./component/category/createCategory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <NavBar>
              <div />
            </NavBar>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/create" element={<CreateCategory />} />
          <Route path="/dishlist" element={<Dishlist />} />
          <Route path="/order" element={<Order />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
