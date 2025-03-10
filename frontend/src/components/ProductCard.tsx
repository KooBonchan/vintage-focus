// ProductCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

// 제품 정보 타입 정의
type Product = {
  image: string;
  name: string;
  price: string;
  manufacturer: string;
  year: string;
  id?: string;
};

// ProductCardProps 인터페이스 정의
export interface ProductCardProps {
  product: Product;
  width?: number;
  height?: number;
}

const ProductCard = ({
  product,
  width = 250,
  height = 330,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    if (product.id) {
      navigate(`/product/${product.id}`);
    } else {
      navigate(`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  return (
    <Card
      sx={{
        width: width,
        height: height + 10,
        textAlign: "center",
        p: 2,
        borderRadius: 3,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: 6,
          cursor: 'pointer',
        },
        backgroundColor: 'transparent',
      }}
      onClick={handleProductClick} // 카드 클릭 시 상세정보 링크로 이동
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: 2,
        }}
      />
      <CardContent>
        <Typography variant="body1" fontWeight="bold" sx={{ mt: 0.5 }}> {/* 타이틀 윗쪽 마진 추가 */}
          {product.name}
        </Typography>
        <Typography
          variant="h5"
          color="primary"
          sx={{ fontSize: "1.0rem", fontWeight: "bold" }}
        >
          {product.price}원
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.1, gap: 1 }}>
          <Typography variant="body2" sx={{ mr: 0, fontSize: "0.6rem" }}>
            {product.manufacturer}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.6rem" }}>
            {product.year}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size='small'
          sx={{
            mt: 0.5,
            fontSize: '0.7rem',
            width: 'small',
            borderRadius: 1.5,
            padding: '2px 4px',
            height: '20px',
          }}
        >
          상세정보
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;