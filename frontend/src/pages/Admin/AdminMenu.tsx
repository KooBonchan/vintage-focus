import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <Box
    sx={{
        width: 220, // 기존보다 약간 좁게 설정
        height: "30vh", // 전체 높이보다 약간 짧게
        position: "absolute", // ✅ 화면에서 떠 있는 느낌
        top: "130px", // 네비게이션 아래에서 시작
        left: "150px", // 왼쪽에서 조금 띄움
        backgroundColor: "#ffffff",
        borderRadius: "12px", // ✅ 둥근 모서리 적용
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // ✅ 떠 있는 효과
        padding: "20px",
        zIndex: 1000,
        transition: "all 0.3s ease-in-out", // 부드러운 애니메이션 효과
      }}
    >
      <Typography variant="h6" sx={{ p: 1, borderBottom: "1px solid #ddd", textAlign: "center" }}>
        관리 메뉴
      </Typography>
      <List>
        <ListItem
          button
          component={NavLink}
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? "active-menu" : "")}
        >
          <ListItemText primary="대시보드" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/admin/products"
          className={({ isActive }) => (isActive ? "active-menu" : "")}
        >
          <ListItemText primary="상품 관리" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/admin/orders"
          className={({ isActive }) => (isActive ? "active-menu" : "")}
        >
          <ListItemText primary="주문 목록" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/admin/delivery"
          className={({ isActive }) => (isActive ? "active-menu" : "")}
        >
          <ListItemText primary="배송 관리" />
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminMenu;
