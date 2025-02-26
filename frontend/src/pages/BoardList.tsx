// BoardList.js
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
import EditIcon from "@mui/icons-material/Edit"; // ✏️ 펜 아이콘 추가
import { useNavigate, useLocation } from "react-router-dom"; // ✅ URL을 감지하고 변경하는 훅
import BoardCard from "../components/BoardCard"; // BoardCard 컴포넌트 임포트

// ✅ 카테고리별 URL 매핑
const categoryRoutes = {
  "/sell-inquiry": "매각문의",
  "/buy-inquiry": "구매문의",
  "/rental-inquiry": "대여문의",
};

// ✅ 더미 데이터 생성
const generateDummyData = () => {
  const categories = Object.values(categoryRoutes);
  const dummyData = [];
  for (let i = 1; i <= 50; i++) {
    const randomCategory = categories[i % categories.length];
    dummyData.push({
      id: i,
      tag: randomCategory,
      title: `문의 내용 ${i}`,
      authors: [{ name: `유저${i}`, avatar: `/static/images/avatar/` }],
      date: `2024-02-${(i % 28) + 1}`, // 랜덤 날짜
      views: Math.floor(Math.random() * 500) + 1, // 랜덤 조회수
    });
  }
  return dummyData;
};

const articleInfo = generateDummyData();

export default function BoardList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ 현재 URL을 기반으로 선택된 탭을 설정
  const currentPath = location.pathname;
  const selectedTab = categoryRoutes[currentPath] || "매각문의"; // 기본값: 매각문의

  // ✅ 선택한 탭의 데이터 필터링
  const filteredArticles = articleInfo.filter((article) => article.tag === selectedTab);

  // ✅ 현재 페이지에 맞는 데이터 추출
  const paginatedArticles = filteredArticles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 800, margin: "0 auto", textAlign: "center", p: 2 }}>
      {/* ✅ 상단 탭 메뉴 */}
      <Tabs
        value={selectedTab}
        onChange={(event, newValue) => {
          navigate(
            Object.keys(categoryRoutes).find((key) => categoryRoutes[key] === newValue) ||
              "/sell-inquiry"
          ); // ✅ 선택된 탭의 URL로 이동
          setPage(1);
        }}
        centered
        textColor="inherit"
        indicatorColor="primary"
      >
        {Object.values(categoryRoutes).map((category) => (
          <Tab key={category} label={category} value={category} />
        ))}
      </Tabs>

      {/* ✅ 게시글 작성 버튼 */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 2 }}>
        <IconButton
          sx={{ mr: 1 }}
          onClick={() => navigate(`/write?category=${selectedTab}`)} // ✅ 현재 카테고리 전달
        >
          <EditIcon /> {/* ✏️ 펜 아이콘 */}
        </IconButton>
        <Typography
          variant="body1"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/write?category=${selectedTab}`)} // ✅ 현재 카테고리 전달
        >
          문의하기
        </Typography>
      </Box>

      {/* ✅ 카드 리스트 */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {paginatedArticles.map((article) => (
          <Grid item xs={12} sm={6} key={article.id}>
            <BoardCard article={article} /> {/* BoardCard에 데이터 전달 */}
          </Grid>
        ))}
      </Grid>

      {/* ✅ 페이지네이션 추가 */}
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
