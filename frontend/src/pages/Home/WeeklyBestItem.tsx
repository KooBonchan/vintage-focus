import { Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";

const WeeklyBestItem = ({ product }: { product: { image: string; name: string; price: string } }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <ProductCard product={product} />
    </Grid>
  );
};

export default WeeklyBestItem;
