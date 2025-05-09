import { Box, Grid, Pagination, Skeleton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../../components/CustomButton";
import ProductCard from "../../components/ProductCard";
import { ProductResponse } from "@/types/response";
import { readProductList } from "@/api/productApi";

// Change the ITEMS_PER_PAGE to 8 to display exactly 2 rows
const ITEMS_PER_PAGE = 8;

const sampleProducts:ProductResponse[] = [
  { id: 1, code: 'vc', productName: "빈티지 카메라", sellingPrice: 120000, company: "Canon", condition: "MINT", consumerPrice: 123120},
  { id: 2, code: 'fc', productName: "필름 카메라", sellingPrice: 150000, company: "Nikon", condition:"EXCELLENT" },
  { id: 3, code: 'dc', productName: "DSLR 카메라", sellingPrice: 1200000, company: "Sony", condition:"FAIR" },
  { id: 4, code: 'mc', productName: "미러리스 카메라", sellingPrice: 900000, company: "Fujifilm", condition:"GOOD" },
  { id: 5, code: 'zc', productName: "즉석 카메라", sellingPrice: 80000, company: "Polaroid", condition:"POOR", consumerPrice: 270000},
  { id: 6, code: 'ac', productName: "액션 카메라", sellingPrice: 500000, company: "GoPro", condition:"MINT" },
];

const WeeklyBestContainer = (props: any) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        flexDirection: "column",
        padding: 2,
        marginTop: 10,
      }}
    >
      {props.children}
    </Box>
  );
};

const WeeklyBestGallery = () => {
  const theme = useTheme();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  
  useEffect(() => {
    readProductList(6)
    .then(setProducts)
  },[setProducts])

  return (
    <WeeklyBestContainer>
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.mode === 'dark' ? 'white' : 'black',
          fontWeight: 'bold',
        }}
      >
        Best Item
      </Typography>

      {/* <Box sx={{ display: "flex", justifyContent: "center", width: '100%', gap: 2, marginTop: 3 }}>
        <Button size="small" label="버튼 1" />
        <Button size="small" label="버튼 2" />
        <Button size="small" label="버튼 3" />
      </Box> */}

      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 3 }}>
        {
          products.length < 6 ? 
          [...Array(6).keys()].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={"skeleton-" + i} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Skeleton variant="rectangular" width="250px" height="330px" />
            </Grid>
          ))
          :
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                { 
                <ProductCard product={product} />
                }
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </WeeklyBestContainer>
  );
};

export default WeeklyBestGallery;
