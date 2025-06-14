import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/pages/authentication/login'
import Register from './components/pages/authentication/register'
import Dashboard from './components/pages/dashboard'
import Home from './components/pages/main_page'
import DetailAccountPage from './components/pages/main_page/detailAcount_page'
import AddressAccount from './components/pages/main_page/detailAcount_page/address'
import DetailChildren from './components/pages/main_page/detailAcount_page/detailChildren'
import NotFound from './components/pages/notfound'
import Order from './components/pages/main_page/detailAcount_page/order'
import OrderFavorites from './components/pages/main_page/detailAcount_page/order_favorites'
import MenuPage from './components/pages/main_page/menu_page'
import DetailsPage from './components/pages/main_page/menu_page/details'
import OrderProduct from "./components/pages/orderProduct"
import Category from './components/pages/dashboard/category'
import ProductDetail from './components/pages/dashboard/category/details'
import "./index.css"
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: undefined,
    }
  }
});

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
          <Route path='menu-page' element={<MenuPage />} />
          <Route path='menu-page/:id' element={<MenuPage />} />
          <Route path='menu-page/:id/:slugProduct' element={<DetailsPage />} />
          
          <Route path="orderProduct" element={<OrderProduct />} />

          <Route path="/account" element={<DetailAccountPage />}>
            <Route index element={<DetailChildren />} />
            <Route path="address" element={<AddressAccount />} />
            <Route path="order" element={<Order />} />
            <Route path="order_favorites" element={<OrderFavorites />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
