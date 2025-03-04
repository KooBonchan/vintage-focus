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
import BoardDetail from './pages/Board/Detail/BoardDetail';
import NoticePage from './pages/Board/Notice/NoticePage';
import NoticeDetail from './pages/Board/Detail/NoticeDetail';
import DeliveryPage from './pages/order/delivery';
import OrderCompletePage from './pages/order/complete';



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
  useEffect(() => {
    initializeSessionStorage(); // ✅ 개발 서버 시작 시 `sessionStorage` 초기화
  }, []);
  const theme = useTheme();
  useEffect(() => {
    document.body.style.backgroundColor= theme.palette.background.default;
  }, [theme]);
  const initializeSessionStorage = () => {
    const existingPosts = sessionStorage.getItem("posts");

    // ✅ 이미 데이터가 있으면 초기화 방지
    if (existingPosts) return;

    // ✅ 기본 더미 데이터 생성
    const dummyPosts = [];
    const categories = ["매각문의", "구매문의", "대여문의"];

    for (let i = 1; i <= 50; i++) {
      dummyPosts.push({
        id: Date.now() + i, // 고유 ID
        title: `테스트 게시글 ${i}`,
        price: `${Math.floor(Math.random() * 100000) + 10000}원`,
        content: `이것은 ${i}번째 테스트 게시글입니다.`,
        date: new Date().toISOString().split("T")[0],
        views: Math.floor(Math.random() * 500),
        author: { name: `사용자${i}`, avatar: "/static/images/avatar/default.png" },
        tag: categories[i % categories.length], // 매각문의 / 구매문의 / 대여문의 순환
        locked: i % 2 === 0, // 짝수 번째 게시글은 비공개
        password: i % 2 === 0 ? "1234" : null, // 비공개 게시글만 비밀번호 설정
      });
    }

    // ✅ `sessionStorage`에 데이터 저장
    sessionStorage.setItem("posts", JSON.stringify(dummyPosts));
  };



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

            {/* 매각문의 라우트 그룹 */}
      <Route path="sell-inquiry">
        <Route index element={<About />} />
        <Route path="write" element={<SellWrite />} />
        <Route path="detail/:id" element={<BoardDetail />} /> {/* ✅ 상세 페이지 추가 */}
      </Route>

      {/* 구매문의 라우트 그룹 */}
      <Route path="buy-inquiry">
        <Route index element={<About />} />
        <Route path="write" element={<BuyWrite />} />
        <Route path="detail/:id" element={<BoardDetail />} /> {/* ✅ 상세 페이지 추가 */}
      </Route>

      {/* 대여문의 라우트 그룹 */}
      <Route path="rental-inquiry">
        <Route index element={<About />} />
        <Route path="write" element={<RentalWrite />} />
        <Route path="detail/:id" element={<BoardDetail />} /> {/* ✅ 상세 페이지 추가 */}
      </Route>


      <Route path="/notice" element={<NoticePage />} /> {/* ✅ 추가 */}
      <Route path="/notice/detail/:id" element={<NoticeDetail />} /> {/* ✅ 공지사항 상세 */}


      
        {/* <Route path="template" element={<MarketingPage />} /> */}
        <Route path="about" element={<About />} />

        <Route path="product">
          <Route index element={<ProductList />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>

        <Route path="order">
          <Route path="cart" element={<Cart />} />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route path="complete" element={<OrderCompletePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

