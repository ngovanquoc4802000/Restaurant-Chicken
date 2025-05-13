import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/pages/dashboard'
import NotFound from './components/pages/notfound'
import Login from './components/pages/authentication/login'
import Register from './components/pages/authentication/register'
import Category from './components/pages/category'
import ProductDetail from './components/pages/category/details'
import "./index.css"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="login/:id" element={<Register />} />

        <Route path="menu" element={<Category />} />
        <Route path="menu/:id" element={<Category />} />
        <Route path="menu/:id/:slugProduct" element={<ProductDetail />} />
  

        <Route path="*" element={<NotFound />} />
        {/* not found luôn ở dưới cùng */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
