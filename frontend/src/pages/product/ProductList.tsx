import { Box, Container, Grid, useTheme } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가
import Navbar from "../../components/Navbar";
import FilterBar from "../../components/FilterBar";
import ProductCard from "../../components/ProductCard";
import { readProductList } from "@/api/productApi";
import { ProductResponse } from "@/types/response";

const ITEMS_PER_PAGE = 16;

const sampleProducts: ProductResponse[] = [
  { id: 1, code: 'vc', productName: "빈티지 카메라", sellingPrice: 120000, company: "Canon", condition: "MINT", },
  { id: 2, code: 'fc', productName: "필름 카메라", sellingPrice: 150000, company: "Nikon", condition:"EXCELLENT" },
  { id: 3, code: 'dc', productName: "DSLR 카메라", sellingPrice: 1200000, company: "Sony", condition:"GOOD" },
  { id: 4, code: 'mc', productName: "미러리스 카메라", sellingPrice: 900000, company: "Fujifilm", condition:"FAIR" },
  { id: 5, code: 'zc', productName: "즉석 카메라", sellingPrice: 80000, company: "Polaroid", condition:"POOR"},
  { id: 6, code: 'ac', productName: "액션 카메라", sellingPrice: 500000, company: "GoPro", condition:"MINT" },
];

function ProductList() {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [filters, setFilters] = useState({
    manufacturer: "",
    year: "",
    price: "",
    sortBy: "",
  });

  useEffect(() => {
    readProductList()
    .then(setProducts)
  },[setProducts])

  const startIndex: number = (page - 1) * ITEMS_PER_PAGE;
  const endIndex: number = startIndex + ITEMS_PER_PAGE;
  const currentPageProducts = sampleProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sampleProducts.length / ITEMS_PER_PAGE);

  console.log(products);
  

  return (
    <>
      <Navbar />
      <Container sx={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 0",
        backgroundColor: theme.palette.background.default, }}>

        <Grid container spacing={3} justifyContent="center">
          {currentPageProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{ display: "flex", flexDirection: "column" }}>
              <div onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: "pointer", margin: "0 auto" }}>
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
