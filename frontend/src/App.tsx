import {Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './routes/dashboard';
import Category from './routes/category';
import DemoOrder from './routes/DemoOrder';
import Dishlist from './routes/dishList';
import Login from './routes/login';
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
