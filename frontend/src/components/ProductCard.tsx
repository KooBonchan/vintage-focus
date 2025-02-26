import { Card, CardMedia, CardContent, Typography } from "@mui/material";

// 타입 정의하기
interface ProductProps {
    product : {
        image: string;
        name : string;
        price : string;
    };
}

function ProductCard({ product }: ProductProps) {
  return (
    <Card 
      sx={{ 
        maxWidth: 250, 
        textAlign: 
        "center", p: 2, 
        borderRadius: 3, 
        transition: "all 0.3s ease", // 부드러운 전환 추가
        "&:hover": {
          transform: "translateY(-6px)", // 마우스 올리면 살짝 위로 올라감 추가
          boxShadow: 6, // 그림자 효과 추가
        },
        }}>
      <CardMedia
        component="img"
        // height="140"
        image={product.image}
        alt={product.name}
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
