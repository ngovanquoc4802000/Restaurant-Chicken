import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/pages/authentication/login'
import Register from './components/pages/authentication/register'
import Category from './components/pages/category'
import ProductDetail from './components/pages/category/details'
import Dashboard from './components/pages/dashboard'
import Home from './components/pages/main_page'
import DetailAccountPage from './components/pages/main_page/detailAcount_page'
import AddressAccount from './components/pages/main_page/detailAcount_page/address'
import DetailChildren from './components/pages/main_page/detailAcount_page/detailChildren'
import NotFound from './components/pages/notfound'
import "./index.css"

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="login/:id" element={<Register />} />
          <Route path="menu" element={<Category />} />
          <Route path="menu/:id" element={<Category />} />
          <Route path="menu/:id/:slugProduct" element={<ProductDetail />} />
          <Route path='/home' element={<Home />} />
          <Route path="/account" element={<DetailAccountPage />}>
            <Route index element={<DetailChildren />} />
            <Route path="address" element={<AddressAccount />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          {/* not found luôn ở dưới cùng */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
