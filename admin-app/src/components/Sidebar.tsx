import styles from "../styles/admin.module.css";

interface SidebarProps {
  onNavigate: (path: string) => void;
  activePath: string;
}

const Sidebar = ({ onNavigate, activePath }: SidebarProps) => {
  const handleNavigation = (path: string) => {
    onNavigate(path);
  };

  return (
    <div className={styles.sidebar}>
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <button onClick={() => handleNavigation("/categories")} className={activePath === "/categories" ? styles.active : ""}>
            Categories
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation("/dishes")} className={activePath === "/dishes" ? styles.active : ""}>
            Dish List
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation("/users")} className={activePath === "/users" ? styles.active : ""}>
            Users
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation("/orders")} className={activePath === "/orders" ? styles.active : ""}>
            Orders
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
