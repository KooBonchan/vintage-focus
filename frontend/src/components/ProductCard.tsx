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
    <Card sx={{ maxWidth: 250, textAlign: "center", p: 2, borderRadius: 3 }}>
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
