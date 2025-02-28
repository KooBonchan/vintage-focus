import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

// 제품 정보 타입 정의
type Product = {
  image: string;
  name: string;
  price: string;
  manufacturer: string; // 제조사 추가
  year: string;         // 년도 추가
};

// ProductCardProps 인터페이스 정의
export interface ProductCardProps {
  product: Product;
  width?: number;
  height?: number;
  onAddToCart?: () => void;
}

// ProductCard 컴포넌트 정의
const ProductCard = ({
  product,
  width = 250,
  height = 330,
  onAddToCart,
}: ProductCardProps) => (
  <Card
    sx={{
      width: width,  // 동적으로 width 설정
      height: height, // 동적으로 height 설정
      textAlign: "center",
      p: 2,
      borderRadius: 3,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: 6,
      },
    }}
  >
    <CardMedia
      component="img"
      image={product.image}
      alt={product.name}
      sx={{ width: "100%", height: "auto" }} // 이미지 크기도 자동 조정
    />
    <CardContent>
      <Typography variant="body1" fontWeight="bold">
        {product.name}
      </Typography>
      <Typography
        variant="h6"
        color="primary"
        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
      >
        {product.price}원
      </Typography>

      {/* 제조사와 년도를 가로로 나란히 배치 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Typography variant="body2" sx={{ mr: 2 }}> {/* mr: 2는 간격 조정 */}
          제조사: {product.manufacturer}
        </Typography>
        <Typography variant="body2">
          년도: {product.year}
        </Typography>
      </Box>

      {onAddToCart && (
        <Button
          variant="contained"
          color="primary"
          onClick={onAddToCart}
          sx={{ mt: 2 }}
        >
          Add to Cart
        </Button>
      )}
    </CardContent>
  </Card>
);

// **default export 추가**
export default ProductCard;
