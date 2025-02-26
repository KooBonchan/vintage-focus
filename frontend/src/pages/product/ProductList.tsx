import { Box, Container, Grid2, Pagination } from "@mui/material";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import FilterBar from "../../components/FilterBar";
import ProductCard from "../../components/ProductCard";

// 한 페이지에 표시할 상품 개수
const ITEMS_PER_PAGE = 16;

// 상품 타입 정의
interface Product {
  image: string;
  name: string;
  price: string;
}


// 예제 데이터
const sampleProducts = [
  { image: "https://placehold.co/250x250", name: "빈티지 카메라", price: "120,000" },
  { image: "https://placehold.co/250x250", name: "필름 카메라", price: "150,000" },
  { image: "https://placehold.co/250x250", name: "DSLR 카메라", price: "1,200,000" },
  { image: "https://placehold.co/250x250", name: "미러리스 카메라", price: "900,000" },
  { image: "https://placehold.co/250x250", name: "즉석 카메라", price: "80,000" },
  { image: "https://placehold.co/250x250", name: "액션 카메라", price: "500,000" },

  { image: "https://placehold.co/250x250", name: "중형 카메라", price: "2,500,000" },
  { image: "https://placehold.co/250x250", name: "파노라마 카메라", price: "700,000" },
  { image: "https://placehold.co/250x250", name: "필름 컴팩트 카메라", price: "400,000" },
  { image: "https://placehold.co/250x250", name: "카메라 렌즈", price: "300,000" },
  { image: "https://placehold.co/250x250", name: "삼각대", price: "120,000" },
  { image: "https://placehold.co/250x250", name: "카메라 가방", price: "150,000" },

  { image: "https://placehold.co/250x250", name: "야외 촬영용 카메라", price: "1,100,000" },
  { image: "https://placehold.co/250x250", name: "고프로", price: "600,000" },
  { image: "https://placehold.co/250x250", name: "카메라 플래시", price: "200,000" },
  { image: "https://placehold.co/250x250", name: "스튜디오 조명", price: "1,500,000" },
  { image: "https://placehold.co/250x250", name: "카메라 필터", price: "50,000" },
  { image: "https://placehold.co/250x250", name: "무선 리모컨", price: "30,000" },

  { image: "https://placehold.co/250x250", name: "폴라로이드 카메라", price: "250,000" },
  { image: "https://placehold.co/250x250", name: "카메라 배터리", price: "80,000" },
  { image: "https://placehold.co/250x250", name: "고급 망원 렌즈", price: "3,000,000" },
  { image: "https://placehold.co/250x250", name: "와이드 앵글 렌즈", price: "1,800,000" },
  { image: "https://placehold.co/250x250", name: "셀카봉", price: "20,000" },
  { image: "https://placehold.co/250x250", name: "카메라 스트랩", price: "35,000" },

  { image: "https://placehold.co/250x250", name: "디지털 뷰파인더", price: "400,000" },
  { image: "https://placehold.co/250x250", name: "초점 맞추기 장치", price: "450,000" },
  { image: "https://placehold.co/250x250", name: "필름 카메라", price: "1,000,000" },
  { image: "https://placehold.co/250x250", name: "컬러 필름", price: "25,000" },
  { image: "https://placehold.co/250x250", name: "흑백 필름", price: "22,000" },
  { image: "https://placehold.co/250x250", name: "외장 플래시", price: "150,000" },
];

function ProductList() {
  const [page, setPage] = useState(1)

  // 현재 페이지의 상품 리스트 계산
  const startIndex: number = (page - 1) * ITEMS_PER_PAGE;
  const endIndex: number = startIndex + ITEMS_PER_PAGE;
  const currentPageProducts: Product[] = sampleProducts.slice(startIndex, endIndex);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(sampleProducts.length / ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />
      <Container sx={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 0" }}>
        
        {/* 상품 리스트 */}
        <Grid2 container spacing={3} columns={4} justifyContent="center">
          {currentPageProducts.map((product, index) => (
            <Grid2 xs={3} key={index}>
              <ProductCard product={product} />
            </Grid2>
          ))}
        </Grid2>

        {/* 페이지네이션 */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Container>
    </>
  );
}

export default ProductList;