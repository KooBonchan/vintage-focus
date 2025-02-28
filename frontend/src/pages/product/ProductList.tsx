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
  manufacturer?: string; // 제조사 추가
  year?: string;         // 년도 추가
}

// 예제 데이터
const sampleProducts = [
  { image: "https://placehold.co/250x250", name: "빈티지 카메라", price: "120,000", manufacturer: "Canon", year: "2021" },
  { image: "https://placehold.co/250x250", name: "필름 카메라", price: "150,000", manufacturer: "Nikon", year: "2020" },
  { image: "https://placehold.co/250x250", name: "DSLR 카메라", price: "1,200,000", manufacturer: "Sony", year: "2019" },
  { image: "https://placehold.co/250x250", name: "미러리스 카메라", price: "900,000", manufacturer: "Fujifilm", year: "2021" },
  { image: "https://placehold.co/250x250", name: "즉석 카메라", price: "80,000", manufacturer: "Polaroid", year: "2022" },
  { image: "https://placehold.co/250x250", name: "액션 카메라", price: "500,000", manufacturer: "GoPro", year: "2022" },

  // 기타 상품들...
];

function ProductList() {
  const [page, setPage] = useState(1);

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
            <Grid2 xs={3} key={index} sx={{ display: "flex", flexDirection: "column" }}>
              <ProductCard
              height={360}
              product={{
                image: 'https://placehold.co/200x200',
                name: 'Sample Product',
                price: '10000'
              }}
              width={250}
                sx={{ mb: 3, height: '0 auto' }}               />
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
