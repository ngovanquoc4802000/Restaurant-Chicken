import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard';
import Category from './pages/content/categoryForm/category';
import DemoOrder from './pages/content/DemoOrder';
import Dishlist from './pages/content/dishList';
import Login from './pages/content/login';
import Error from './routes/error';
function App() {
  return (
    <Routes >
      <Route path='/' element={<Dashboard/>} 
     >
     <Route path='/category' element={<Category/>} />
     <Route path='/demo' element={<DemoOrder/>} />
     <Route path='/dishlist' element={<Dishlist/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='*' element={<Error/>} />
     </Route>
    </Routes>
  )
}

export default App
