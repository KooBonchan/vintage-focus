import { useLocation } from "react-router-dom";
import { Container, Paper, Box, Typography, Grid, Divider } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const OrderCompletePage = () => {
  const location = useLocation();
  const { orderItems, paymentInfo } = location.state || {}; // 결제 페이지에서 넘긴 데이터 받기

  if (!orderItems || !paymentInfo) {
    return (
      <Container maxWidth="md" sx={{ py: 4, minHeight: "100vh", bgcolor: "#f8f8f8" }}>
        <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#fff", borderRadius: "8px" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            주문 정보가 없습니다.
          </Typography>
        </Paper>
      </Container>
    );
  }

  const orderNumber = paymentInfo.merchant_uid || "알 수 없음"; // 결제 고유 주문 번호
  const orderDate = new Date().toLocaleDateString(); // 현재 날짜

  return (
    <Container maxWidth="md" sx={{ py: 4, minHeight: "100vh", bgcolor: "#f8f8f8" }}>
      {/* 결제 완료 메시지 */}
      <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#fff", borderRadius: "8px", boxShadow: "none", mb: 4 }}>
        <ShoppingBagIcon sx={{ fontSize: 60, color: "#555" }} />
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
          결제가 완료되었습니다.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: "#777" }}>
          {orderDate} 주문하신 상품의 주문번호는 <Typography component="span" sx={{ fontWeight: "bold", color: "#333" }}>{orderNumber}</Typography> 입니다.
        </Typography>
      </Paper>

      {/* 주문 상세 정보 */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: "#fff", borderRadius: "8px", boxShadow: "none", border: "1px solid #ddd" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          주문 상세 내역
        </Typography>
        <Box sx={{ border: "1px solid #ddd", p: 2, borderRadius: "8px", bgcolor: "#fcfcfc" }}>
          <Grid container spacing={1} sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
            <Grid item xs={3} sx={{ fontWeight: "bold" }}>상품/옵션 정보</Grid>
            <Grid item xs={2} sx={{ fontWeight: "bold" }}>수량</Grid>
            <Grid item xs={2} sx={{ fontWeight: "bold" }}>상품 금액</Grid>
            <Grid item xs={2} sx={{ fontWeight: "bold" }}>합계 금액</Grid>
            <Grid item xs={3} sx={{ fontWeight: "bold" }}>배송비</Grid>
          </Grid>
          {orderItems.map((item) => (
            <Grid container spacing={1} key={item.id} sx={{ py: 1, borderBottom: "1px solid #eee", alignItems: "center" }}>
              <Grid item xs={3}>{item.name}</Grid>
              <Grid item xs={2}>{item.quantity}개</Grid>
              <Grid item xs={2}>{item.price.toLocaleString()}원</Grid>
              <Grid item xs={2}>{(item.price * item.quantity).toLocaleString()}원</Grid>
              <Grid item xs={3}>{item.shipping.toLocaleString()}원</Grid>
            </Grid>
          ))}
        </Box>
      </Paper>

      {/* 배송지 정보 & 결제 정보 */}
      <Grid container spacing={2}>
        {/* 배송 정보 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: "#fff", borderRadius: "8px", boxShadow: "none", border: "1px solid #ddd" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>배송지 정보</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography sx={{ color: "#555", mb: 1 }}><strong>주문자:</strong> {paymentInfo.buyer_name}</Typography>
            <Typography sx={{ color: "#555", mb: 1 }}><strong>휴대폰 번호:</strong> {paymentInfo.buyer_tel}</Typography>
            <Typography sx={{ color: "#555" }}><strong>배송지 주소:</strong> {paymentInfo.buyer_addr}</Typography>
          </Paper>
        </Grid>

        {/* 결제 정보 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: "#fff", borderRadius: "8px", boxShadow: "none", border: "1px solid #ddd" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>결제 정보</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography sx={{ color: "#555", mb: 1 }}><strong>상품 금액:</strong> {paymentInfo.paid_amount.toLocaleString()}원</Typography>
            <Typography sx={{ color: "#555", mb: 1 }}><strong>결제 방식:</strong> {paymentInfo.pay_method === "card" ? "신용카드" : paymentInfo.pay_method}</Typography>
            <Typography sx={{ color: "#111", fontWeight: "bold" }}><strong>결제 상태:</strong> {paymentInfo.status === "paid" ? "결제 완료" : "결제 실패"}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderCompletePage;
