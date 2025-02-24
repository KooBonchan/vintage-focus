import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import { Route, Routes } from 'react-router';
import './App.css';
import { AuthLayout } from './layouts/AuthLayout';
import { HeaderFooterLayout } from './layouts/HeaderFooterLayout';
import { About } from './pages/About';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ProductDetail } from './pages/product/ProductDetail';
import { ProductList } from './pages/product/ProductList';
import { useEffect } from 'react';
import { Home } from './pages/Home';

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
        <Route path="about" element={<About />} />
        {/* <Route path="template" element={<MarketingPage />} /> */}
        <Route path="product">
          <Route index element={<ProductList />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
