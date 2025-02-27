import { Card, CardMedia, CardContent, Typography } from "@mui/material";

// 타입 정의하기
interface ProductProps {
    product : {
        image: string;
        name : string;
        price : string;
    };
}
function ProductCard({ product, width, height }: ProductProps & { width: number; height: number }) {
  return (
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
      }}>
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
        <Typography variant="body2" color="textSecondary">
          {product.price}원
        </Typography>
      </CardContent>
    </Card>
  );
}


export default ProductCard;
