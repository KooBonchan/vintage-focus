import * as React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  Pagination,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useLocation } from "react-router-dom";
import BoardCard from "../../components/BoardCard";

// ✅ 카테고리별 URL 매핑
const categoryRoutes = {
  "/sell-inquiry": "매각문의",
  "/buy-inquiry": "구매문의",
  "/rental-inquiry": "대여문의",
};

// ✅ 로컬 스토리지에서 게시글 불러오기
const articleInfo = JSON.parse(localStorage.getItem("posts") || "[]");

export default function BoardList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ 현재 URL을 기반으로 선택된 탭을 설정
  const currentPath = location.pathname;
  const selectedTab = categoryRoutes[currentPath] || "매각문의";

  // ✅ 선택한 탭의 데이터 필터링
  const filteredArticles = articleInfo.filter((article) => article.tag === selectedTab);

  return (
    <Box sx={{ width: "100%", maxWidth: 1000, margin: "0 auto", textAlign: "center", p: 2 }}>
      {/* ✅ 상단 탭 메뉴 */}
      <Tabs
        value={currentPath}
        onChange={(event, newValue) => {
          navigate(newValue);
          setPage(1);
        }}
        centered
        textColor="inherit"
        indicatorColor="primary"
      >
        {Object.entries(categoryRoutes).map(([path, label]) => (
          <Tab key={path} label={label} value={path} />
        ))}
      </Tabs>

      {/* ✅ 게시글 작성 버튼 */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 2 }}>
        <IconButton sx={{ mr: 1 }} onClick={() => navigate(`${currentPath}/write`)}>
          <EditIcon />
        </IconButton>
        <Typography variant="body1" sx={{ cursor: "pointer" }} onClick={() => navigate(`${currentPath}/write`)}>
          문의하기
        </Typography>
      </Box>

      {/* ✅ 카드 리스트 (클릭 시 상세 페이지 이동) */}
      <Grid container spacing={2} sx={{ mt: 3, display: "flex", flexDirection: "column" }}>
        {filteredArticles.map((article) => (
          <Grid
            item
            xs={12}
            key={article.id}
            sx={{ width: "100%", cursor: "pointer" }}
            onClick={() => navigate(`${currentPath}/detail/${article.id}`)} // ✅ 상세 페이지 이동
          >
            <BoardCard article={article} />
          </Grid>
        ))}
      </Grid>

      {/* ✅ 페이지네이션 */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredArticles.length / itemsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
