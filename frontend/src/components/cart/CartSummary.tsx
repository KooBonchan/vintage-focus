import { Box, Typography, Button } from "@mui/material";

interface CartSummaryProps {
  totalPrice: number;
  totalShipping: number;
}

export default function CartSummary({ totalPrice, totalShipping }: CartSummaryProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
      <Typography>
        총 {totalPrice.toLocaleString()}원 + 배송비 {totalShipping.toLocaleString()}원 = 합계{" "}
        {(totalPrice + totalShipping).toLocaleString()}원
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" color="primary">
          선택 상품 주문
        </Button>
        <Button variant="contained" color="primary">
          전체 상품 주문
        </Button>
      </Box>
    </Box>
  );
}
