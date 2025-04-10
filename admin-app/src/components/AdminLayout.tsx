import { useState } from "react";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import CategoryList from "./CategoryList";
import DishList from "./Dishlist";
import UserList from "./UserList";
import OrderList from "./OrderList";
import styles from "../styles/admin.module.css";

const AdminLayout = () => {
  const [activePage, setActivePage] = useState<string>("/categories");

  const handleNavigation = (path: string) => {
    setActivePage(path);
  };

  const renderContent = () => {
    switch (activePage) {
      case "/categories":
        return <CategoryList />;
      case "/dishes":
        return <DishList />;
      case "/users":
        return <UserList />;
      case "/orders":
        return <OrderList />;
      default:
        return <div>Welcome to the Admin Panel!</div>;
    }
  };

  const getTitle = () => {
    switch (activePage) {
      case "/categories":
        return "Categories";
      case "/dishes":
        return "Dish List";
      case "/users":
        return "Users";
      case "/orders":
        return "Orders";
      default:
        return "Admin Dashboard";
    }
  };

  return (
    <div className={styles.adminLayout}>
      <Sidebar onNavigate={handleNavigation} activePath={activePage} />
      <ContentArea title={getTitle()}>{renderContent()}</ContentArea>
    </div>
  );
};

export default AdminLayout;
