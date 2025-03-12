import { useState } from "react";
import { Box, Typography, Chip, Select, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// 배송 데이터
const deliveryData = [
  { "id": "D001", "orderId": "O1001", "customer": "김철수", "status": "배송중", "tracking": "1234-5678-9012", "address": "서울시 강남구 테헤란로 123" },
  { "id": "D002", "orderId": "O1002", "customer": "이영희", "status": "배송 완료", "tracking": "5678-9012-3456", "address": "부산시 해운대구 해변로 45" },
  { "id": "D003", "orderId": "O1003", "customer": "박민수", "status": "대기중", "tracking": "-", "address": "대전시 유성구 도룡동 89" },
  { "id": "D004", "orderId": "O1004", "customer": "정하나", "status": "배송중", "tracking": "6789-0123-4567", "address": "광주시 서구 상무대로 88" },
  { "id": "D005", "orderId": "O1005", "customer": "최우진", "status": "배송 완료", "tracking": "3456-7890-1234", "address": "인천시 남동구 구월동 77" },
  { "id": "D006", "orderId": "O1006", "customer": "한지민", "status": "배송중", "tracking": "1357-2468-9753", "address": "경기도 성남시 분당구 판교로 1" },
  { "id": "D007", "orderId": "O1007", "customer": "장동건", "status": "배송 완료", "tracking": "1122-3344-5566", "address": "서울시 서초구 서초대로 77" },
  { "id": "D008", "orderId": "O1008", "customer": "손예진", "status": "대기중", "tracking": "-", "address": "대구시 수성구 범어로 99" },
  { "id": "D009", "orderId": "O1009", "customer": "김우빈", "status": "배송중", "tracking": "7788-9900-1122", "address": "광주시 남구 백운로 101" },
  { "id": "D010", "orderId": "O1010", "customer": "박보검", "status": "배송 완료", "tracking": "2233-4455-6677", "address": "서울시 강동구 천호대로 50" },
  { "id": "D011", "orderId": "O1011", "customer": "아이유", "status": "배송중", "tracking": "9988-7766-5544", "address": "경기도 용인시 기흥구 기흥로 12" },
  { "id": "D012", "orderId": "O1012", "customer": "유재석", "status": "배송 완료", "tracking": "6666-5555-4444", "address": "서울시 마포구 합정동 11" },
  { "id": "D013", "orderId": "O1013", "customer": "강호동", "status": "대기중", "tracking": "-", "address": "경남 창원시 성산구 중앙대로 88" },
  { "id": "D014", "orderId": "O1014", "customer": "배수지", "status": "배송중", "tracking": "5544-3322-1100", "address": "부산시 동래구 온천장 44" },
  { "id": "D015", "orderId": "O1015", "customer": "정우성", "status": "배송 완료", "tracking": "4433-2211-0099", "address": "서울시 종로구 종로대로 10" },
  { "id": "D016", "orderId": "O1016", "customer": "김연아", "status": "대기중", "tracking": "-", "address": "강원도 평창군 대관령면 77" },
  { "id": "D017", "orderId": "O1017", "customer": "이병헌", "status": "배송중", "tracking": "1122-3344-5566", "address": "경기도 남양주시 경춘로 31" },
  { "id": "D018", "orderId": "O1018", "customer": "공유", "status": "배송 완료", "tracking": "6677-8899-0011", "address": "서울시 성북구 동소문로 25" },
  { "id": "D019", "orderId": "O1019", "customer": "손흥민", "status": "배송중", "tracking": "5544-3322-1100", "address": "인천시 연수구 송도대로 55" },
  { "id": "D020", "orderId": "O1020", "customer": "송혜교", "status": "배송 완료", "tracking": "7766-9988-1122", "address": "서울시 은평구 녹번로 9" },
  { "id": "D021", "orderId": "O1021", "customer": "차은우", "status": "배송중", "tracking": "8855-6622-4433", "address": "경기도 고양시 일산서구 중앙로 100" },
  { "id": "D022", "orderId": "O1022", "customer": "설현", "status": "배송 완료", "tracking": "5522-7711-3344", "address": "제주특별자치도 제주시 애월읍 88" },
  { "id": "D023", "orderId": "O1023", "customer": "수지", "status": "대기중", "tracking": "-", "address": "대전시 서구 둔산로 12" },
  { "id": "D024", "orderId": "O1024", "customer": "이동욱", "status": "배송중", "tracking": "6622-4455-8899", "address": "서울시 용산구 이태원로 5" }
]



// 배송 상태 색상 설정
const getStatusColor = (status: string) => {
  switch (status) {
    case "배송중":
      return "success"; 
    case "배송 완료":
      return "primary"; 
    case "대기중":
      return "default"; 
    default:
      return "default";
  }
};

const AdminDelivery = () => {
  const [filterStatus, setFilterStatus] = useState("전체");

  // 배송 상태 필터 핸들러
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // 필터링된 데이터
  const filteredData = deliveryData.filter(
    (item) => filterStatus === "전체" || item.status === filterStatus
  );

  // 테이블 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "배송 ID", width: 120, headerAlign: "center", align: "center", sortable: false, disableColumnMenu: true, disableColumnFilter: true },
    { field: "orderId", headerName: "주문 ID", width: 120, headerAlign: "center", align: "center", sortable: false, disableColumnMenu: true, disableColumnFilter: true },
    { field: "customer", headerName: "고객명", width: 150, headerAlign: "center", align: "center", sortable: false, disableColumnMenu: true, disableColumnFilter: true },
    {
      field: "status",
      headerName: "배송 상태",
      width: 180,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      disableColumnFilter: true,
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
              minWidth: "120px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              border: "none",
              backgroundColor: "transparent",
              appearance: "none",
              "& .MuiSelect-select": { textAlign: "center", display: "flex", justifyContent: "center" },
              "& .MuiSelect-icon": { display: "none" },
              "&:focus": { outline: "none", border: "none" },
            }}
          >
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="배송중">배송중</MenuItem>
            <MenuItem value="배송 완료">배송 완료</MenuItem>
            <MenuItem value="대기중">대기중</MenuItem>
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
    {
      field: "tracking",
      headerName: "운송장 번호",
      width: 180,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      disableColumnFilter: true,
      renderCell: (params) => (params.value !== "-" ? params.value : "운송장 없음"),
    },
    { field: "address", headerName: "주소", width: 250, headerAlign: "center", align: "center", sortable: false, disableColumnMenu: true, disableColumnFilter: true },
  ];
  
  

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
       <Box sx={{ width: "90%", maxWidth: "1100px" }}> 
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
          배송 목록
        </Typography>

        <DataGrid
          rows={filteredData} 
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
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AdminDelivery;
