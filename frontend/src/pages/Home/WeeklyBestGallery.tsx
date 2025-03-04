import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import WeeklyBestItem from "./WeeklyBestItem";  // WeeklyBestItem 컴포넌트를 import
import Button from "../../components/Button";  // 상대경로로 Button 임포트


const ITEMS_PER_PAGE = 16;

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
];

const WeeklyBestContainer = (props: any) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "transparent",  // 배경색 제거
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

const WeeklyBestTitle = (props: any) => {
  return (
    <Typography variant="h3" sx={{ fontWeight: "bold", color: "black" }}>
      {props.children}
    </Typography>
  );
};

const WeeklyBestGallery = () => {
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageProducts = sampleProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sampleProducts.length / ITEMS_PER_PAGE);

  return (
    <WeeklyBestContainer>
      <WeeklyBestTitle>Weekly Best</WeeklyBestTitle>

      {/* 버튼 추가 */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 3 }}>
        <Button size="small" label="버튼 1" />
        <Button size="small" label="버튼 2" />
        <Button size="small" label="버튼 3" />
      </Box>

      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 3 }}>
        {currentPageProducts.map((product, index) => (
          <WeeklyBestItem key={index} product={product} />
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
