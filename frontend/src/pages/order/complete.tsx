import { useLocation, useNavigate } from "react-router-dom";
import { Container, Paper, Box, Typography, Grid, Divider, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const OrderCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { form, orderItems } = location.state || {}; // DeliveryPage에서 넘겨준 form 데이터 받기

  // 데이터가 전달되지 않았으면 "주문 정보가 없습니다." 출력
  if (!form || !orderItems) {
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

  const orderNumber = Math.floor(Math.random() * 1000000).toString(); // 주문 번호 예시
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
          {orderDate} 주문하신 상품의 주문번호는{" "}
          <Typography component="span" sx={{ fontWeight: "bold", color: "#333" }}>
            {orderNumber}
          </Typography>{" "}
          입니다.
        </Typography>
      </Paper>

      {/* 주문 상세 정보 (상품 이미지 추가) */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: "#fff", borderRadius: "8px", boxShadow: "none", border: "1px solid #ddd" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          주문 상세 내역
        </Typography>
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", width: "15%" }}>상품</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", width: "30%" }}>상품/옵션 정보</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", width: "10%" }}>수량</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", width: "15%" }}>상품 금액</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", width: "15%" }}>배송비</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", width: "15%" }}>합계 금액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    <img src={item.image} alt={item.name} width={80} height={60} style={{ objectFit: "cover", borderRadius: "5px" }} />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.quantity}개</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.price.toLocaleString()}원</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.shipping.toLocaleString()}원</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{(item.price * item.quantity).toLocaleString()}원</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* 배송지 정보 & 결제 정보 */}
      <Grid container spacing={2}>
        {/* 배송 정보 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: "#fff", borderRadius: "8px", boxShadow: "none", border: "1px solid #ddd" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>배송지 정보</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography sx={{ color: "#555", mb: 1 }}><strong>주문자:</strong> {form.recipient}</Typography>
            <Typography sx={{ color: "#555", mb: 1 }}><strong>휴대폰 번호:</strong> {form.phone}</Typography>
            <Typography sx={{ color: "#555" }}><strong>배송지 주소:</strong> {form.address} {form.detailAddress} ({form.postalCode})</Typography>
          </Paper>
        </Grid>

        {/* 결제 정보 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: "#fff", borderRadius: "8px", boxShadow: "none", border: "1px solid #ddd" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>결제 정보</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography sx={{ color: "#555", mb: 1 }}><strong>상품 금액:</strong> {form.totalPrice}</Typography>
            <Typography sx={{ color: "#555", mb: 1 }}><strong>배송비:</strong> {form.shippingFee}</Typography>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}><strong>총 결제 금액:</strong> {form.finalAmount}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 홈으로 이동 버튼 */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="text" color="primary" sx={{ fontSize: "16px", ":hover": { backgroundColor: "#f5f5f5" }}} onClick={() => navigate("/")}>계속 쇼핑하기</Button>
      </Box>
    </Container>
  );
};

export default OrderCompletePage;
