import { Box, Typography, Chip, Select, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

// 주문 데이터
const orderData = [
  { id: 1000, customer: "아이유", items: ["빈티지 필름 E"], totalPrice: 497353, status: "결제 완료", orderDate: "2024-03-13" },
  { id: 1001, customer: "공유", items: ["렌즈 EE", "삼각대 FF"], totalPrice: 130532, status: "결제 대기", orderDate: "2024-03-27" },
  { id: 1002, customer: "한지민", items: ["빈티지 카메라 DD"], totalPrice: 394800, status: "결제 완료", orderDate: "2024-03-17" },
  { id: 1003, customer: "공유", items: ["빈티지 필름 E"], totalPrice: 258269, status: "결제 대기", orderDate: "2024-03-13" },
  { id: 1004, customer: "공유", items: ["필름 AA", "렌즈 BB", "삼각대 CC"], totalPrice: 257982, status: "결제 완료", orderDate: "2024-03-11" },
  { "id": 1000, "customer": "아이유", "items": ["빈티지 필름 E"], "totalPrice": 497353, "status": "결제 완료", "orderDate": "2024-03-13" },
  { "id": 1001, "customer": "공유", "items": ["렌즈 EE", "삼각대 FF"], "totalPrice": 130532, "status": "결제 대기", "orderDate": "2024-03-27" },
  { "id": 1002, "customer": "한지민", "items": ["빈티지 카메라 DD"], "totalPrice": 394800, "status": "결제 완료", "orderDate": "2024-03-17" },
  { "id": 1003, "customer": "공유", "items": ["빈티지 필름 E"], "totalPrice": 258269, "status": "결제 대기", "orderDate": "2024-03-13" },
  { "id": 1004, "customer": "김철수", "items": ["렌즈 BB", "필름 AA"], "totalPrice": 285920, "status": "결제 완료", "orderDate": "2024-03-20" },
  { "id": 1005, "customer": "이영희", "items": ["삼각대 CC", "렌즈 EE"], "totalPrice": 172800, "status": "결제 완료", "orderDate": "2024-03-25" },
  { "id": 1006, "customer": "박보검", "items": ["빈티지 카메라 X"], "totalPrice": 359000, "status": "결제 대기", "orderDate": "2024-03-07" },
  { "id": 1007, "customer": "손예진", "items": ["필름 JJ"], "totalPrice": 89000, "status": "결제 완료", "orderDate": "2024-03-15" },
  { "id": 1008, "customer": "강호동", "items": ["렌즈 Y", "빈티지 필름 E"], "totalPrice": 310200, "status": "결제 대기", "orderDate": "2024-03-19" },
  { "id": 1009, "customer": "배수지", "items": ["빈티지 카메라 DD", "필름 AA"], "totalPrice": 482950, "status": "결제 완료", "orderDate": "2024-03-28" },
  { "id": 1010, "customer": "차은우", "items": ["빈티지 카메라 A"], "totalPrice": 199000, "status": "결제 대기", "orderDate": "2024-03-08" },
  { "id": 1011, "customer": "설현", "items": ["렌즈 C", "삼각대 D"], "totalPrice": 174200, "status": "결제 완료", "orderDate": "2024-03-14" },
  { "id": 1012, "customer": "수지", "items": ["빈티지 필름 F"], "totalPrice": 75000, "status": "결제 대기", "orderDate": "2024-03-23" },
  { "id": 1013, "customer": "이동욱", "items": ["렌즈 Z", "필름 B"], "totalPrice": 217300, "status": "결제 완료", "orderDate": "2024-03-26" },
  { "id": 1014, "customer": "박서준", "items": ["삼각대 G"], "totalPrice": 109800, "status": "결제 대기", "orderDate": "2024-03-10" },
  { "id": 1015, "customer": "장기용", "items": ["렌즈 HH", "필름 GG"], "totalPrice": 238500, "status": "결제 완료", "orderDate": "2024-03-12" },
  { "id": 1016, "customer": "한예슬", "items": ["빈티지 카메라 M", "렌즈 K"], "totalPrice": 397500, "status": "결제 대기", "orderDate": "2024-03-09" },
  { "id": 1017, "customer": "김우빈", "items": ["삼각대 L"], "totalPrice": 99000, "status": "결제 완료", "orderDate": "2024-03-05" },
  { "id": 1018, "customer": "송혜교", "items": ["빈티지 카메라 DD"], "totalPrice": 399000, "status": "결제 대기", "orderDate": "2024-03-21" },
  { "id": 1019, "customer": "정해인", "items": ["필름 X", "렌즈 W"], "totalPrice": 184000, "status": "결제 완료", "orderDate": "2024-03-29" }
];

// 주문 상태 색상 설정
const getStatusColor = (status: string) => (status === "결제 완료" ? "primary" : "success");

const AdminOrders = () => {
  const [filterStatus, setFilterStatus] = useState("전체");

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // 필터링된 데이터
  const filteredOrders = orderData.filter(
    (order) => filterStatus === "전체" || order.status === filterStatus
  );

  // 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "주문 ID", width: 120, headerAlign: "center", align: "center" },
    { field: "customer", headerName: "고객명", width: 150, headerAlign: "center", align: "center" },
    { field: "items", headerName: "주문 상품", width: 250, renderCell: (params) => params.value.join(", "), headerAlign: "center", align: "center" },
    { field: "totalPrice", headerName: "총 가격", width: 150, renderCell: (params) => `${params.value.toLocaleString()}원`, headerAlign: "center", align: "center" },
    { 
      field: "status",
      headerName: "주문 상태",
      width: 180,
      headerAlign: "center", // ✅ 헤더 가운데 정렬
      align: "center", // ✅ 셀 내부 텍스트 가운데 정렬
      renderHeader: () => (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Select
            value={filterStatus}
            onChange={handleFilterChange}
            size="small"
            variant="standard" 
            disableUnderline 
            sx={{
              fontSize: "0.85rem",
              minWidth: "100px",
              display: "flex",
              justifyContent: "center", // ✅ 가운데 정렬
              alignItems: "center",
              textAlign: "center",
              border: "none",
              backgroundColor: "transparent",
              appearance: "none",
              "& .MuiSelect-select": { textAlign: "center", display: "flex", justifyContent: "center" }, // ✅ 드롭다운 선택된 값도 정렬
              "& .MuiSelect-icon": { display: "none" }, // 드롭다운 아이콘 제거
              "&:focus": { outline: "none", border: "none" },
            }}
          >
            <MenuItem value="전체" sx={{ display: "flex", justifyContent: "center" }}>전체</MenuItem>
            <MenuItem value="결제 완료" sx={{ display: "flex", justifyContent: "center" }}>결제 완료</MenuItem>
            <MenuItem value="결제 대기" sx={{ display: "flex", justifyContent: "center" }}>결제 대기</MenuItem>
          </Select>
        </Box>
      ),
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          sx={{ fontWeight: "bold", fontSize: "0.85rem", px: 1 }}
        />
      ),
    },
    { field: "orderDate", headerName: "주문 날짜", width: 150, headerAlign: "center", align: "center" },
  ].map((col) => ({
    ...col,
    headerAlign: "center",
    align: "center",
    disableColumnMenu: true, 
    sortable: false,      
      
  }));

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
       <Box sx={{ width: "90%", maxWidth: "1100px" }}> 
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
          주문 목록
        </Typography>

        

        <DataGrid
          rows={filteredOrders} 
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          pagination 
          autoHeight
          sx={{
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none !important",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              outline: "none !important", 
            },
            "& .MuiDataGrid-columnHeader:focus-within": {
             outline: "none !important", 
            }, 
            "& .MuiDataGrid-columnHeader:focus-visible": {
              outline: "none !important",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AdminOrders;
