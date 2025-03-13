import { Box, Container, Grid, Grid2, Skeleton, useTheme } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가
import Navbar from "../../components/Navbar";
import FilterBar from "../../components/FilterBar";
import ProductCard from "../../components/ProductCard";
import { readProductList } from "@/api/productApi";
import { ProductResponse } from "@/types/response";

const ITEMS_PER_PAGE = 12;


function ProductList() {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductResponse[] | null>(null)
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
  const currentPageProducts = products?.slice(startIndex, endIndex);

  const totalPages = products ? Math.ceil(products.length / ITEMS_PER_PAGE) : 0;

  return (
    <>
      <Navbar />
      <Container sx={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 0",
        backgroundColor: theme.palette.background.default, }}
        >

        <Grid2 container spacing={3} justifyContent="center">
          {currentPageProducts?
          currentPageProducts.map((product) => (
            <Grid2 size={{xs:12, sm:6, md:4, lg:3}} key={`product${product.id}`} sx={{ display: "flex", flexDirection: "column" }}>
              <div onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: "pointer", margin: "0 auto" }}>
                <ProductCard
                  height={330}
                  product={product}
                  width={250}
                />
              </div>
            </Grid2>
          ))
          :
          Array.from({ length: ITEMS_PER_PAGE }, (_, i) => i).map((_, i) => (<>
            <Grid2 size={{xs:12, sm:6, md:4, lg:3}} key={i} >
              <Skeleton variant="rectangular" width={250} height={330} style={{margin: "0 auto"}} />
            </Grid2>
          </>))
          }
        </Grid2>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => { setPage(value); }}
            color="primary"
          />
        </Box>
      </Container>
    </>
  );
}

export default ProductList;
