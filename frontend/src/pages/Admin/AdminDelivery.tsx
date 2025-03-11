import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Chip, Box } from "@mui/material";

const deliveryData = [
  { id: "D001", orderId: "O1001", customer: "김철수", status: "배송중", tracking: "1234-5678-9012", address: "서울시 강남구 테헤란로 123" },
  { id: "D002", orderId: "O1002", customer: "이영희", status: "배송 완료", tracking: "5678-9012-3456", address: "부산시 해운대구 해변로 45" },
  { id: "D003", orderId: "O1003", customer: "박민수", status: "대기중", tracking: "-", address: "대전시 유성구 도룡동 89" },
  { id: "D004", orderId: "O1004", customer: "정하나", status: "배송중", tracking: "6789-0123-4567", address: "광주시 서구 상무대로 88" },
  { id: "D005", orderId: "O1005", customer: "최우진", status: "배송 완료", tracking: "3456-7890-1234", address: "인천시 남동구 구월동 77" },
];

// 배송 상태별 색상 적용 함수
const getStatusColor = (status) => {
  switch (status) {
    case "배송중":
      return "primary";
    case "배송 완료":
      return "success";
    case "대기중":
      return "warning";
    default:
      return "default";
  }
};

const AdminDelivery = () => {
  return (
    <Box sx={{ width: "calc(100% - 260px)", mt: 4, display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 1200, width: "100%" }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          배송 목록
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell align="center"><b>ID</b></TableCell>
                <TableCell align="center"><b>주문 ID</b></TableCell>
                <TableCell align="center"><b>고객명</b></TableCell>
                <TableCell align="center"><b>배송 상태</b></TableCell>
                <TableCell align="center"><b>운송장 번호</b></TableCell>
                <TableCell align="center"><b>주소</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveryData.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell align="center">{delivery.id}</TableCell>
                  <TableCell align="center">{delivery.orderId}</TableCell>
                  <TableCell align="center">{delivery.customer}</TableCell>
                  <TableCell align="center">
                    <Chip label={delivery.status} color={getStatusColor(delivery.status)} />
                  </TableCell>
                  <TableCell align="center">{delivery.tracking !== "-" ? delivery.tracking : "운송장 없음"}</TableCell>
                  <TableCell align="center">{delivery.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminDelivery;
