import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Paper, Box, Typography, TextField, Button, Grid } from "@mui/material";

const DeliveryPage = () => {
  const location = useLocation();
  const orderItems = location.state?.orderItems || [];

  const [form, setForm] = useState({
    recipient: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    totalPrice: "0원",
    shippingFee: "0원",
    finalAmount: "0원",
  });

  // 주문한 상품의 가격 계산
  useEffect(() => {
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalShipping = orderItems.reduce((acc, item) => acc + item.shipping, 0);
    setForm((prev) => ({
      ...prev,
      totalPrice: `${totalPrice.toLocaleString()}원`,
      shippingFee: `${totalShipping.toLocaleString()}원`,
      finalAmount: `${(totalPrice + totalShipping).toLocaleString()}원`,
    }));
  }, [orderItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, bgcolor: "#f8f8f8", minHeight: "100vh" }}>
      {/* 주문 상세 내역 */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: "#fff", boxShadow: "none", borderRadius: "8px", border: "1px solid #ddd" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          주문 상세 내역
        </Typography>
        <Box sx={{ border: "1px solid #ddd", p: 2, borderRadius: "8px", bgcolor: "#fcfcfc" }}>
          <Grid container spacing={1} sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
            <Grid item xs={2} sx={{ fontWeight: "bold", textAlign: "center" }}>상품 이미지</Grid>
            <Grid item xs={3} sx={{ fontWeight: "bold", textAlign: "center" }}>상품/옵션 정보</Grid>
            <Grid item xs={2} sx={{ fontWeight: "bold", textAlign: "center" }}>수량</Grid>
            <Grid item xs={2} sx={{ fontWeight: "bold", textAlign: "center" }}>상품 금액</Grid>
            <Grid item xs={2} sx={{ fontWeight: "bold", textAlign: "center" }}>합계 금액</Grid>
            <Grid item xs={1} sx={{ fontWeight: "bold", textAlign: "center" }}>배송비</Grid>
          </Grid>

          {orderItems.length > 0 ? (
            orderItems.map((item) => (
              <Grid container spacing={1} key={item.id} sx={{ py: 1, borderBottom: "1px solid #eee", alignItems: "center" }}>
                <Grid item xs={2} sx={{ textAlign: "center" }}>
                  <img src={item.image} alt={item.name} width={80} height={60} style={{ borderRadius: "5px" }} />
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "center" }}>{item.name}</Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>{item.quantity}개</Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>{item.price.toLocaleString()}원</Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>{(item.price * item.quantity).toLocaleString()}원</Grid>
                <Grid item xs={1} sx={{ textAlign: "center" }}>{item.shipping.toLocaleString()}원</Grid>
              </Grid>
            ))
          ) : (
            <Box sx={{ p: 2, textAlign: "center", color: "#777" }}>주문한 상품이 없습니다.</Box>
          )}
        </Box>

           {/* 합계 금액 */}
      <Paper sx={{ p: 2, mt: 3, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "1px solid #ddd", bgcolor: "#FFFFFF", minHeight: "50px" }}>
        <Typography sx={{ fontWeight: "bold", minWidth: "200px", textAlign: "center" }}>
          총 {orderItems.length}개의 상품 금액 {form.totalPrice}
        </Typography>
        <Typography sx={{ fontWeight: "bold", mx: 2 }}>+</Typography>
        <Typography sx={{ fontWeight: "bold", minWidth: "120px", textAlign: "center" }}>
          배송비 {form.shippingFee}
        </Typography>
        <Typography sx={{ fontWeight: "bold", mx: 2 }}>=</Typography>
        <Typography sx={{ fontWeight: "bold", minWidth: "120px", textAlign: "center" }}>
          합계 {form.finalAmount}
        </Typography>
      </Paper>
      </Paper>

      

      {/* 배송 정보 */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: "#fff", boxShadow: "none", borderRadius: "8px", border: "1px solid #ddd" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          배송 정보
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}><Typography sx={{ fontWeight: "bold", color: "#555" }}>주문하시는 분</Typography></Grid>
          <Grid item xs={9}><TextField fullWidth name="recipient" value={form.recipient} onChange={handleChange} variant="outlined" size="small" /></Grid>

          <Grid item xs={3}><Typography sx={{ fontWeight: "bold", color: "#555" }}>전화번호</Typography></Grid>
          <Grid item xs={9}><TextField fullWidth name="phone" value={form.phone} onChange={handleChange} variant="outlined" size="small" /></Grid>

          <Grid item xs={3}><Typography sx={{ fontWeight: "bold", color: "#555" }}>이메일</Typography></Grid>
          <Grid item xs={9}><TextField fullWidth name="email" value={form.email} onChange={handleChange} variant="outlined" size="small" /></Grid>

          <Grid item xs={3}><Typography sx={{ fontWeight: "bold", color: "#555" }}>받으실 곳</Typography></Grid>
          <Grid item xs={6}><TextField fullWidth name="address" value={form.address} onChange={handleChange} variant="outlined" size="small" /></Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="outlined" sx={{ bgcolor: "#ddd", color: "#333", ":hover": { bgcolor: "#ccc" } }}>
              우편번호 검색
            </Button>
          </Grid>
        </Grid>
      </Paper>

   

       {/* 결제 정보 */}
       <Paper sx={{ p: 3, mb: 3, bgcolor: "#fff", boxShadow: "none", borderRadius: "8px", border: "1px solid #ddd" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          결제 정보
        </Typography>
        <Grid container spacing={0} sx={{ border: "1px solid #ddd", borderRadius: "8px", bgcolor: "#fcfcfc" }}>
          <Grid item xs={3} sx={{ bgcolor: "#f5f5f5", display: "flex", alignItems: "center", pl: 2, borderBottom: "1px solid #ddd" }}>
            <Typography sx={{ fontWeight: "bold", color: "#555" }}>상품 합계 금액</Typography>
          </Grid>
          <Grid item xs={9} sx={{ borderBottom: "1px solid #ddd" }}>
            <TextField fullWidth disabled value={form.totalPrice} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={3} sx={{ bgcolor: "#f5f5f5", display: "flex", alignItems: "center", pl: 2, borderBottom: "1px solid #ddd" }}>
            <Typography sx={{ fontWeight: "bold", color: "#555" }}>배송비</Typography>
          </Grid>
          <Grid item xs={9} sx={{ borderBottom: "1px solid #ddd" }}>
            <TextField fullWidth disabled value={form.shippingFee} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={3} sx={{ bgcolor: "#f5f5f5", display: "flex", alignItems: "center", pl: 2 }}>
            <Typography sx={{ fontWeight: "bold", color: "#555" }}>최종 결제 금액</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField fullWidth disabled value={form.finalAmount} variant="outlined" size="small" />
          </Grid>
        </Grid>
      </Paper>

      {/* 합계 금액 표시 */}
      <Paper
        sx={{
          p: 2,
          mt: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "8px",
          border: "1px solid #ddd",
          bgcolor: "#FFFFFF",
          minHeight: "50px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "18px", ml: 2 }}>최종 결제 금액</Typography>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px", color: "#333", mr: 2 }}>
          {form.finalAmount}
        </Typography>
      </Paper>

      {/* 결제 버튼 */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button variant="outlined" sx={{ bgcolor: "#333", color: "#fff", width: "50%", fontWeight: "bold", fontSize: "16px", ":hover": { bgcolor: "#555" } }}>
          결제하기
        </Button>
      </Box>
    </Container>
  );
};

export default DeliveryPage;
