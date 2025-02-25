import { Box, Button, Typography } from "@mui/material";

interface CartSummaryProps {
  totalPrice: number;
  totalShipping: number;
}

export default function CartSummary({ totalPrice, totalShipping }: CartSummaryProps) {
  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      {/* 총 금액 박스 */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ddd",
          borderRadius: 2,
          padding: 2,
          mb: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          총 {totalPrice.toLocaleString()}원 + 배송비 {totalShipping.toLocaleString()}원 = 합계{" "}
          {(totalPrice + totalShipping).toLocaleString()}원
        </Typography>
      </Box>

      {/* 하단 버튼 컨테이너 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* 왼쪽 버튼 */}
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-start", flexGrow: 1 }}>
          <Button variant="outlined">전체 선택</Button>
          <Button variant="outlined">선택 상품 삭제</Button>
        </Box>

        {/* 오른쪽 버튼 */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button variant="outlined">선택 상품 주문</Button>
          <Button variant="contained" color="primary">
            전체 상품 주문
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
