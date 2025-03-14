import DrinkList from "./Conditional Rendering/drinkList";
import IsPackingList from "./Conditional Rendering/isPackingList";
import TodoList from "./JavaScript in JSX with Curly Braces/TodoList";
import Profile from "./Passing Props to a Component/Profile";
import Gallery from "./Passing Props to a Component/baitap_trích_xuat_1_thành_phần/Home";
import ParentProfile from "./Your-first-component/baitap1/ParentProfile";
import List from "./Your-first-component/baitap2/list";
import "./order.css";

function Order() {
  return (
    <section>
      <h1>Amazing scient</h1>
      <ParentProfile />
      <List />
      <TodoList />
      <Profile />
      <Gallery />
      <IsPackingList />
      <DrinkList />
    </section>
  );
}

export default Order;
