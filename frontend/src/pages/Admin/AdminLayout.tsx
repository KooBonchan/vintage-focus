import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminMenu from "./AdminMenu"; // 새로 만든 관리 메뉴 컴포넌트 가져오기

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      {/* 관리 메뉴: 독립적인 요소로 배치 */}
      <AdminMenu />

      {/* 메인 컨텐츠 영역 (관리 메뉴의 영향을 받지 않도록 수정) */}
      <Box sx={{ flexGrow: 1, paddingTop: "40px" }}>
        <Outlet /> {/* 서브 페이지가 여기에 렌더링됨 */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
