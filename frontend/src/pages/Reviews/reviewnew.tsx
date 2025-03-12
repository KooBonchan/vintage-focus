import React from "react";
import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const dummyProducts = [
  { id: 1, name: "Frame 36", image: "https://placehold.co/200" },
  { id: 2, name: "Frame 37", image: "https://placehold.co/200" },
  { id: 3, name: "Frame 38", image: "https://placehold.co/200" },
  { id: 4, name: "Frame 39", image: "https://placehold.co/200" },
];

const ReviewNew = () => {
  const navigate = useNavigate(); // ✅ useNavigate()는 반드시 컴포넌트 내부에서 호출해야 함

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", textAlign: "center", padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        구매후 7일안에 리뷰를 작성해 주세요.!!
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
        {dummyProducts.map((product) => (
          <Card key={product.id} sx={{ textAlign: "center", padding: 2 }}>
            <CardMedia component="img" image={product.image} alt={product.name} sx={{ height: 100 }} />
            <CardContent>
              <Typography variant="body1">{product.name}</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                onClick={() => navigate("/mypage/review/wrote")} // ✅ 클릭 시 "/mypage/review/wrote"로 이동
              >
                제품 리뷰 하기
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewNew;
