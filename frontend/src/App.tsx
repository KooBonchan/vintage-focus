import SignIn from '@/pages/auth/SignIn';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import './App.css';
import { AuthLayout } from './layouts/AuthLayout';
import { HeaderFooterLayout } from './layouts/HeaderFooterLayout';
import About from './pages/About';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminDelivery from './pages/Admin/AdminDelivery';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminProducts from './pages/Admin/AdminProducts';
import Register from './pages/auth/Register';
import Callback from './pages/auth/SignIn/components/Callback';
import BuyDetail from './pages/Board/Detail/BuyDetail';
import NoticeDetail from './pages/Board/Detail/NoticeDetail';
import RentalDetail from './pages/Board/Detail/RentalDetail';
import ReviewDetail from './pages/Board/Detail/ReviewDetail';
import SellDetail from './pages/Board/Detail/SellDetail';
import NoticePage from './pages/Board/Notice/NoticePage';
import BuyWrite from './pages/Board/Write/BuyWrite';
import RentalWrite from './pages/Board/Write/RentalWrite';
import SellWrite from './pages/Board/Write/SellWrite';
import { Home } from './pages/Home';
import MyPage from './pages/MyPage/MyPage';
import Cart from './pages/order/cart';
import OrderCompletePage from './pages/order/complete';
import DeliveryPage from './pages/order/delivery';
import { ProductDetail } from './pages/product/ProductDetail';
import ProductList from './pages/product/ProductList';
import EditReviewForm from './pages/Reviews/EditReviewForm';
import EditReviewList from './pages/Reviews/EditReviewList';
import ReviewNew from './pages/Reviews/reviewnew';
import Reviews from './pages/Reviews/reviews';
import WroteReview from './pages/Reviews/wrotereview';
import { GoogleMapsProvider } from './utils/GoogleMapsProvider';
import { dummyReviews } from './utils/dummyReviews';


const baseTheme = createTheme({
  typography: {
    fontFamily: '"IBM Plex Sans KR", "Roboto", "Helvetica", "Arial", "sans-serif"',
    fontSize: 28,
  },
  cssVariables: true,
  palette: {
    background: {
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
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);
  const initializeSessionStorage = () => {
    const existingPosts = sessionStorage.getItem('posts');

    // ✅ 이미 데이터가 있으면 초기화 방지
    if (existingPosts) return;

    // ✅ 기본 더미 데이터 생성
    const dummyPosts = Array(5).fill(dummyReviews).flat().map((post, i) => ({...post, id: Date.now() + i}));

    // const categories = ['매각문의', '구매문의', '대여문의'];

    // for (let i = 1; i <= 50; i++) {
    //   dummyPosts.push({
    //     id: Date.now() + i, // 고유 ID
    //     title: `테스트 게시글 ${i}`,
    //     price: `${Math.floor(Math.random() * 100000) + 10000}원`,
    //     content: `이것은 ${i}번째 테스트 게시글입니다.`,
    //     date: new Date().toISOString().split('T')[0],
    //     views: Math.floor(Math.random() * 500),
    //     author: { name: `사용자${i}`, avatar: '/static/images/avatar/default.png' },
    //     tag: categories[i % categories.length], // 매각문의 / 구매문의 / 대여문의 순환
    //     locked: i % 2 === 0, // 짝수 번째 게시글은 비공개
    //     password: i % 2 === 0 ? '1234' : null, // 비공개 게시글만 비밀번호 설정
    //   });
    // }

    // ✅ `sessionStorage`에 데이터 저장
    sessionStorage.setItem('posts', JSON.stringify(dummyPosts));
  };

  return (
    <ThemeProvider theme={{ baseTheme }}>
      <GoogleMapsProvider>
        <Router />
      </GoogleMapsProvider>
    </ThemeProvider>
  );
}

function Router() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="register-result" element={<Register />} />
        <Route path="callback" element={<Callback />} />
      </Route>

      <Route element={<HeaderFooterLayout />}>
        <Route index element={<Home />} />

        {/* 매각문의 라우트 그룹 */}
        <Route path="sell-inquiry">
          <Route index element={<About />} />
          <Route path="write" element={<SellWrite />} />
          <Route path="detail/:id" element={<SellDetail />} /> {/* ✅ 상세 페이지 추가 */}
        </Route>

        {/* 구매문의 라우트 그룹 */}
        <Route path="buy-inquiry">
          <Route index element={<About />} />
          <Route path="write" element={<BuyWrite />} />
          <Route path="detail/:id" element={<BuyDetail />} /> {/* ✅ 상세 페이지 추가 */}
        </Route>

        {/* 대여문의 라우트 그룹 */}
        <Route path="rental-inquiry">
          <Route index element={<About />} />
          <Route path="write/:productId" element={<RentalWrite />} />
          <Route path="detail/:id" element={<RentalDetail />} /> {/* ✅ 상세 페이지 추가 */}
        </Route>

        {/* 새로운 리뷰 라우트 그룹 */}
        {/* 리뷰 작성 페이지 */}
        <Route path="/write-review" element={<WroteReview />} />

        {/* 리뷰 관련 중첩 라우트 */}
        <Route path="reviews">
          <Route index element={<Reviews />} /> {/* 기본 경로: /reviews */}
          <Route path=":id" element={<ReviewDetail />} /> {/* 상세 페이지: /reviews/:id */}
        </Route>

        {/* 마이페이지 및 리뷰 수정 관련 경로 */}
        <Route path="/mypage">
          <Route index element={<MyPage />} /> {/* 기본 경로: /mypage */}
          <Route path="edit-reviews">
            <Route index element={<EditReviewList />} /> {/* 리뷰 수정 목록: /mypage/edit-reviews */}
            <Route path=":id" element={<EditReviewForm />} /> {/* 리뷰 수정 폼: /mypage/edit-reviews/:id */}
          </Route>
        </Route>

        <Route path="/notice" element={<NoticePage />} /> {/* ✅ 추가 */}
        <Route path="/notice/detail/:id" element={<NoticeDetail />} /> {/* ✅ 공지사항 상세 */}

        <Route path="about" element={<About />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/review/" element={<ReviewNew />} /> {/* ✅ 제품 리뷰 가능한 리스트를 보여주는 페이지로 이동 */}
        <Route path="/mypage/review/wrote" element={<WroteReview />} /> {/* ✅ 리뷰 작성 페이지 추가 */}

        <Route path="product">
          <Route index element={<ProductList />} /> {/* /product */}
          <Route path=":id" element={<ProductDetail />} /> {/* /product/:id */}
          <Route path=":id/rental-write" element={<RentalWrite />} /> {/* /product/:id/rental-write */}
        </Route>

        <Route path="order">
          <Route path="cart" element={<Cart />} />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route path="complete" element={<OrderCompletePage />} />
        </Route>
      </Route>

      {/* 관리자 */}
      <Route element={<HeaderFooterLayout />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to={"/admin/dashboard"} />} />  {/* 기본 페이지 */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="delivery" element={<AdminDelivery />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;