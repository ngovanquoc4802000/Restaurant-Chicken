import { Link, Outlet } from "react-router-dom";
import "../styles/nav.scss"

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/category">Category </Link>
        </li>
        <li>
          <Link to="/demo">Demo Order</Link>
        </li>
        <li>
          <Link to="/dishlist">Dish list</Link>
        </li>
        <li>
          <Link to="/login">User</Link>
        </li>
      </ul> 
      <Outlet />
    </nav>
  );
}

export default Navigation;