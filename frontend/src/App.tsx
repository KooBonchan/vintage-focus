import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { AuthLayout } from './layouts/AuthLayout';
import { HeaderFooterLayout } from './layouts/HeaderFooterLayout';
import About from './pages/About';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import BuyWrite from './pages/Board/Write/BuyWrite';
import RentalWrite from './pages/Board/Write/RentalWrite';
import SellWrite from './pages/Board/Write/SellWrite';
import { Home } from './pages/Home';
import Cart from './pages/order/cart';
import { ProductDetail } from './pages/product/ProductDetail';
import ProductList from "./pages/product/ProductList";



const baseTheme = createTheme({
  typography: {
    fontFamily: '"IBM Plex Sans KR", "Roboto", "Helvetica", "Arial", "sans-serif"',
    fontSize: 28,
  },
  cssVariables: true,
  palette: {
    background:{
      default: '#135799',
    },
    primary: {
      main: '#cccccc',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#ff0000',
      secondary: '#00ffff',
    },
  },
});

function App() {
  const theme = useTheme();
  useEffect(() => {
    document.body.style.backgroundColor= theme.palette.background.default;
  }, [theme]);

  return (
    
    <ThemeProvider theme={{baseTheme}}>
      <Router />
    </ThemeProvider>
    
  )
}

function Router(){
  return (
    
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<HeaderFooterLayout />}>
        <Route index element={<Home />} />
        
        {/* ✅ 매각문의 라우트 그룹 */}
        <Route path="sell-inquiry">
          <Route index element={<About />} />
          <Route path="write" element={<SellWrite />} />
        </Route>

        {/* ✅ 구매문의 라우트 그룹 */}
        <Route path="buy-inquiry">
          <Route index element={<About />} />
          <Route path="write" element={<BuyWrite />} />
        </Route>

        {/* ✅ 대여문의 라우트 그룹 */}
        <Route path="rental-inquiry">
          <Route index element={<About />} />
          <Route path="write" element={<RentalWrite />} />
        </Route>

        {/* <Route path="template" element={<MarketingPage />} /> */}
        <Route path="about" element={<About />} />

        <Route path="product">
          <Route index element={<ProductList />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>

        <Route path="order">
          <Route path="cart" element={<Cart />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

