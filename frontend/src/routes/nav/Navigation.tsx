import { Link, Outlet } from "react-router-dom";
import '../../styles/nav.scss';
function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navUl">
        <Link to="/category">
          <li>
            Category
          </li>
        </Link>
        <Link to="/demo">
          <li>
            Demo Order
          </li>
        </Link>
        <Link to="/dishlist">
          <li>
            Dish list
          </li>
        </Link>
        <Link to="/login">
          <li>
            User
          </li>
        </Link>
      </ul>
      <Outlet />
    </nav>
  );
}

export default Navigation;