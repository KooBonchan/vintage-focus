import { Box, Container, Grid, Grid2, Skeleton, useTheme } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams  } from "react-router-dom"; // 추가
import Navbar from "../../components/Navbar";
import FilterBar from "../../components/FilterBar";
import ProductCard from "../../components/ProductCard";
import { readProductList } from "@/api/productApi";
import { ProductResponse } from "@/types/response";

const ITEMS_PER_PAGE = 12;



function ProductList() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "all";
  
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState<ProductResponse[] | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[] | null>(null)
  const [filters, setFilters] = useState({
    company: "",
    condition: "",
    sortBy: "",
    category: urlCategory,
  });

  useEffect(() => {
    readProductList()
    .then(setProducts)
  },[setProducts])

  useEffect(() => {
    
    setFilters(prevFilters => ({
      ...prevFilters,
      category: urlCategory, // filters.category 값을 URL 값과 동기화
    }));
  }, [urlCategory]);

  useEffect(() => {
    
    if (!products || products.length === 0) return;

    let filtered = [...products];
    const selectedCategory = urlCategory || filters.category;

    // 카메라,렌즈 필터
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(product => {
        console.log(`🔍 필터링 중 - category1: ${product.category1}, category2: ${product.category2}, category3: ${product.category3}, 선택된 카테고리: ${filters.category}`);
        
        if (filters.category === "lens") {
          return product.category3 === "Lenses"; 
        } else if (filters.category === "camera") {
          return product.category2 === "Cameras";
        } else if (filters.category === "dicam") {
          return product.category2 === "Digital Cameras" || product.category3 === "Digital Cameras"; // ✅ 디카 필터링 (필요하면 조정)
        }
        
        return false;
      });
    }

    if(filters.company && filters.company !== "all") {
      filtered = filtered.filter(product => 
        product.company?.toLowerCase() === filters.company.toLowerCase()
      );
    }

    // 상품 상태(condition)
    if (filters.condition && filters.condition !== "all") {
      filtered = filtered.filter(product => {
        console.log(`🔍 필터링 중 - condition: ${product.condition}, 선택된 상태: ${filters.condition}`);
    
        // 프론트에서 선택한 필터 값과 백엔드에서 사용하는 값 매칭
        const conditionMapping = {
          mint: "MINT", // 미세사용 → MINT
          good: "GOOD", // 양호 → GOOD
          used: ["FAIR", "POOR"] // 사용감 있음 → FAIR 또는 POOR
        };
    
        // "used"는 배열이므로 includes()로 체크
        if (filters.condition === "used") {
          return conditionMapping.used.includes(product.condition);
        } else {
          return product.condition === conditionMapping[filters.condition];
        }
      });
    }
    

  
    
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "lowPrice":
            return (a.sellingPrice || 0) - (b.sellingPrice || 0);
          case "highPrice":
            return (b.sellingPrice || 0) - (a.sellingPrice || 0);
          case "views":
            return (b.viewCount || 0) - (a.viewCount || 0);
          case "likes":
            return (b.likeCount || 0) - (a.likeCount || 0);
          default:
            return 0;
        }
      });
    }
    setFilteredProducts(filtered);
  }, [products, filters, setFilters, setFilteredProducts])

  

  const startIndex: number = (page - 1) * ITEMS_PER_PAGE;
  const endIndex: number = startIndex + ITEMS_PER_PAGE;
  const currentPageProducts = filteredProducts?.slice(startIndex, endIndex);

  const totalPages = filteredProducts ? Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) : 0;

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages]);


  return (
    <>
      <Navbar filters={filters} setFilters={setFilters} />
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
