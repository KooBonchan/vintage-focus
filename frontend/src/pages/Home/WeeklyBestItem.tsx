import { Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";  // ProductCard 컴포넌트를 import

const WeeklyBestItem = ({ product }: { product: { image: string; name: string; price: string } }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <ProductCard
        product={product}
        sx={{
          transition: "all 0.3s ease", // 부드러운 전환
          "&:hover": {
            transform: "translateY(-5px)", // 마우스 올리면 위로 올라감
            boxShadow: 3, // 마우스 올리면 그림자 강하게
          },
        }}
      />
    </Grid>
  );
};

export default WeeklyBestItem;
