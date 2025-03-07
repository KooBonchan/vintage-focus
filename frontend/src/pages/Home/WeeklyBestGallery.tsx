import { Box, Grid, Pagination, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import Button from "../../components/Button";
import ProductCard from "../../components/ProductCard";

const ITEMS_PER_PAGE = 16;

const sampleProducts = [
  { image: "https://placehold.co/250x250", name: "빈티지 카메라", price: "120,000", manufacturer: "제조사1", year: "2023", id: "1" },
  { image: "https://placehold.co/250x250", name: "필름 카메라", price: "150,000", manufacturer: "제조사2", year: "2023", id: "2" },
  { image: "https://placehold.co/250x250", name: "DSLR 카메라", price: "1,200,000", manufacturer: "제조사3", year: "2023", id: "3" },
  { image: "https://placehold.co/250x250", name: "미러리스 카메라", price: "900,000", manufacturer: "제조사4", year: "2023", id: "4" },
  { image: "https://placehold.co/250x250", name: "즉석 카메라", price: "80,000", manufacturer: "제조사5", year: "2023", id: "5" },
  { image: "https://placehold.co/250x250", name: "액션 카메라", price: "500,000", manufacturer: "제조사6", year: "2023", id: "6" },
  { image: "https://placehold.co/250x250", name: "중형 카메라", price: "2,500,000", manufacturer: "제조사7", year: "2023", id: "7" },
  { image: "https://placehold.co/250x250", name: "파노라마 카메라", price: "700,000", manufacturer: "제조사8", year: "2023", id: "8" },
  { image: "https://placehold.co/250x250", name: "필름 컴팩트 카메라", price: "400,000", manufacturer: "제조사9", year: "2023", id: "9" },
  { image: "https://placehold.co/250x250", name: "카메라 렌즈", price: "300,000", manufacturer: "제조사10", year: "2023", id: "10" },
  { image: "https://placehold.co/250x250", name: "삼각대", price: "120,000", manufacturer: "제조사11", year: "2023", id: "11" },
  { image: "https://placehold.co/250x250", name: "카메라 가방", price: "150,000", manufacturer: "제조사12", year: "2023", id: "12" },
  { image: "https://placehold.co/250x250", name: "야외 촬영용 카메라", price: "1,100,000", manufacturer: "제조사13", year: "2023", id: "13" },
  { image: "https://placehold.co/250x250", name: "고프로", price: "600,000", manufacturer: "제조사14", year: "2023", id: "14" },
  { image: "https://placehold.co/250x250", name: "카메라 플래시", price: "200,000", manufacturer: "제조사15", year: "2023", id: "15" },
  { image: "https://placehold.co/250x250", name: "스튜디오 조명", price: "1,500,000", manufacturer: "제조사16", year: "2023", id: "16" },
  { image: "https://placehold.co/250x250", name: "카메라 필터", price: "50,000", manufacturer: "제조사17", year: "2023", id: "17" },
  { image: "https://placehold.co/250x250", name: "무선 리모컨", price: "30,000", manufacturer: "제조사18", year: "2023", id: "18" },
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
        marginTop: 20,
      }}
    >
      {props.children}
    </Box>
  );
};

const WeeklyBestGallery = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageProducts = sampleProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sampleProducts.length / ITEMS_PER_PAGE);

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

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 3 }}>
        <Button size="small" label="버튼 1" />
        <Button size="small" label="버튼 2" />
        <Button size="small" label="버튼 3" />
      </Box>

      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 3 }}>
        {currentPageProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
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
    </WeeklyBestContainer>
  );
};

export default WeeklyBestGallery;