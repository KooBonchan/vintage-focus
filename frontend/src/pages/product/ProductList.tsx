import { Box, Container, Grid, useTheme } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가
import Navbar from "../../components/Navbar";
import FilterBar from "../../components/FilterBar";
import ProductCard from "../../components/ProductCard";

const ITEMS_PER_PAGE = 16;

interface Product {
  id: number; // 상품 ID 추가
  image: string;
  name: string;
  price: string;
  manufacturer?: string;
  year?: string;
}

const sampleProducts: Product[] = [
  { id: 1, image: "https://placehold.co/250x250", name: "빈티지 카메라", price: "120,000", manufacturer: "Canon", year: "2021" },
  { id: 2, image: "https://placehold.co/250x250", name: "필름 카메라", price: "150,000", manufacturer: "Nikon", year: "2020" },
  { id: 3, image: "https://placehold.co/250x250", name: "DSLR 카메라", price: "1,200,000", manufacturer: "Sony", year: "2019" },
  { id: 4, image: "https://placehold.co/250x250", name: "미러리스 카메라", price: "900,000", manufacturer: "Fujifilm", year: "2021" },
  { id: 5, image: "https://placehold.co/250x250", name: "즉석 카메라", price: "80,000", manufacturer: "Polaroid", year: "2022" },
  { id: 6, image: "https://placehold.co/250x250", name: "액션 카메라", price: "500,000", manufacturer: "GoPro", year: "2022" },
];

function ProductList() {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const startIndex: number = (page - 1) * ITEMS_PER_PAGE;
  const endIndex: number = startIndex + ITEMS_PER_PAGE;
  const currentPageProducts: Product[] = sampleProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sampleProducts.length / ITEMS_PER_PAGE);

  const [filters, setFilters] = useState({
    manufacturer: "",
    year: "",
    price: "",
    sortBy: "",
  });

  return (
    <>
      <Navbar />
      <Container sx={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 0",
        backgroundColor: theme.palette.background.default, }}>

        <Grid container spacing={3} justifyContent="center">
          {currentPageProducts.map((product) => (
            <Grid item xs={3} key={product.id} sx={{ display: "flex", flexDirection: "column" }}>
              <div onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: "pointer" }}>
                <ProductCard
                  height={330}
                  product={product}
                  width={250}
                  sx={{ mb: 3, height: "0 auto" }}
                />
              </div>
            </Grid>
          ))}
        </Grid>

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
