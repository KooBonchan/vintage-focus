import { Route, Routes } from 'react-router'
import './App.css'
import { AuthLayout } from './layouts/AuthLayout';
import { HeaderFooterLayout } from './layouts/HeaderFooterLayout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ProductList } from './pages/product/ProductList';
import { ProductDetail } from './pages/product/ProductDetail';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<HeaderFooterLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="product">
          <Route index element={<ProductList />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Route>
    </Routes>
    </Container>
  )
}

export default App
