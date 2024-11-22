import { Link, Outlet } from 'react-router-dom';
import './App.css';
import './styles/nav.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
function App() {
  return (
    <div className="App">
      <nav>
        <ul className='navUl'>
          <Link to="/category">
            <li>Category</li>
          </Link>
          <Link to="/dishlist">
            <li>DishList</li>
          </Link>
          <Link to="/login">
            <li>User</li>
          </Link>
          <Link to="/order">
            <li>Order</li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
