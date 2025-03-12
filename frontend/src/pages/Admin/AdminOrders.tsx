import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Chip, Box } from "@mui/material";

const orderData = [
  { id: "O1001", customer: "김철수", totalPrice: 150000, status: "결제 완료", items: ["빈티지 카메라 A", "필름 B"], orderDate: "2024-03-10" },
  { id: "O1002", customer: "이영희", totalPrice: 250000, status: "배송 중", items: ["렌즈 C", "삼각대 D"], orderDate: "2024-03-12" },
  { id: "O1003", customer: "박민수", totalPrice: 85000, status: "결제 대기", items: ["빈티지 필름 E"], orderDate: "2024-03-14" },
  { id: "O1004", customer: "정하나", totalPrice: 330000, status: "결제 완료", items: ["빈티지 카메라 X", "렌즈 Y"], orderDate: "2024-03-15" },
  { id: "O1005", customer: "최우진", totalPrice: 120000, status: "배송 완료", items: ["삼각대 Z"], orderDate: "2024-03-16" },
];

// 주문 상태별 색상 적용 함수
const getStatusColor = (status) => {
  switch (status) {
    case "결제 완료":
      return "success";
    case "배송 중":
      return "primary";
    case "결제 대기":
      return "warning";
    case "배송 완료":
      return "default";
    default:
      return "default";
  }
};

const AdminOrders = () => {
  return (
    <Box sx={{ width: "calc(100% - 260px)", mt: 4, display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 1200, width: "100%" }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          주문 목록
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell align="center"><b>주문 ID</b></TableCell>
                <TableCell align="center"><b>고객명</b></TableCell>
                <TableCell align="center"><b>주문 상품</b></TableCell>
                <TableCell align="center"><b>총 가격</b></TableCell>
                <TableCell align="center"><b>주문 상태</b></TableCell>
                <TableCell align="center"><b>주문 날짜</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell align="center">{order.id}</TableCell>
                  <TableCell align="center">{order.customer}</TableCell>
                  <TableCell align="center">{order.items.join(", ")}</TableCell>
                  <TableCell align="center">{order.totalPrice.toLocaleString()}원</TableCell>
                  <TableCell align="center">
                    <Chip label={order.status} color={getStatusColor(order.status)} />
                  </TableCell>
                  <TableCell align="center">{order.orderDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminOrders;
