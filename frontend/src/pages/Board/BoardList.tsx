// BoardList.js
import * as React from "react";
import { useState, useEffect } from "react";
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
import PasswordModal from "./PasswordModal"; // 비밀번호 모달 컴포넌트 가져오기

const categoryRoutes = {
  "/sell-inquiry": "매각문의",
  "/buy-inquiry": "구매문의",
  "/rental-inquiry": "대여문의",
};

export default function BoardList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const [selectedArticle, setSelectedArticle] = useState(null);

  const currentPath = location.pathname;
  const selectedTab = categoryRoutes[currentPath] || "매각문의";

  useEffect(() => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    setPosts(storedPosts);
  }, []);

  const filteredArticles = posts.filter((article) => article.tag === selectedTab);

  const handleArticleClick = (article) => {
    if (article.locked) {
      setSelectedArticle(article);
    } else {
      navigate(`${currentPath}/detail/${article.id}`);
    }
  };

  const handlePasswordCheck = (articleId) => {
    navigate(`${currentPath}/detail/${articleId}`);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1000, margin: "0 auto", textAlign: "center", p: 2 }}>
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

      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 2 }}>
        <IconButton sx={{ mr: 1 }} onClick={() => navigate(`${currentPath}/write`)}>
          <EditIcon />
        </IconButton>
        <Typography variant="body1" sx={{ cursor: "pointer" }} onClick={() => navigate(`${currentPath}/write`)}>
          문의하기
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {filteredArticles.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((article) => (
          <Grid item xs={12} key={article.id} sx={{ width: "100%", cursor: "pointer" }} onClick={() => handleArticleClick(article)}>
            <BoardCard article={article} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredArticles.length / itemsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* 비밀번호 모달 컴포넌트 사용 */}
      <PasswordModal
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onPasswordCheck={handlePasswordCheck}
        selectedArticle={selectedArticle}
      />
    </Box>
  );
}
