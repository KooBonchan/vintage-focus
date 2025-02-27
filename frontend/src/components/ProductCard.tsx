import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

// 제품 정보 타입 정의
type Product = {
  image: string;
  name: string;
  price: string;
};

export interface ProductCardProps {
  product: Product;
  width?: number;
  height?: number;
  onAddToCart?: () => void;
}

export const ProductCard = ({ product, width = 250, height = 300, onAddToCart }: ProductCardProps) => (
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
