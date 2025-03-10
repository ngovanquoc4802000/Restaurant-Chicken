import { Route, Routes } from "react-router-dom";
import NavBar from "./component/Navbar";
import Category from "./component/category/category";
import CreateCategory from "./component/category/createCategory";
import Views from "./component/category/viewCategory";
import Dishlist from "./component/dishlist/dishlist";
import NotFound from "./component/error/error";
import Home from "./component/home/home";
import Order from "./component/order/order";
import User from "./component/user/user";
import UpdateCategories from "./component/category/updateCategory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Home />} />

          <Route path="/category" element={<Category />} />

          <Route path="/createCategories" element={<CreateCategory />} />

          <Route path="/viewsCategories/:id/:handle/:url" element={<Views />} />

          <Route path="/updateCategories/:id/:handle/:url" element={<UpdateCategories />} />

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
