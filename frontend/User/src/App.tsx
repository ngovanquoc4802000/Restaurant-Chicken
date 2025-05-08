import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/pages/dashboard'
import NotFound from './components/pages/notfound'
import "./index.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
             

        </Route>
        <Route path="*" element={<NotFound />} />
        {/* not found luôn ở dưới cùng */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
