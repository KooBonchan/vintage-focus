import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* ✅ 사이드바 고정 (Layout으로 분리) */}
      <Box
        sx={{
          width: 250,
          height: "100vh",
          flexShrink: 0,
          mr: 3,
          borderRight: "1px solid #ddd",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#ffffff",
          paddingTop: "80px",
          zIndex: 1000,
        }}
      >
        <Typography variant="h6" sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
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

      {/* ✅ 메인 컨텐츠 영역 */}
      <Box sx={{ flexGrow: 1, ml: "270px", width: "calc(100% - 270px)" }}>
        <Outlet /> {/* 서브 페이지가 여기에 렌더링됨 */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
