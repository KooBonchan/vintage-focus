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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
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

export default function BoardList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ 비밀번호 입력 모달 상태
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  // ✅ 현재 URL을 기반으로 선택된 탭을 설정
  const currentPath = location.pathname;
  const selectedTab = categoryRoutes[currentPath] || "매각문의";

  // ✅ sessionStorage에서 게시글 불러오기
  useEffect(() => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    setPosts(storedPosts);
  }, []);

  // ✅ 선택한 탭의 데이터 필터링
  const filteredArticles = posts.filter((article) => article.tag === selectedTab);

  // ✅ 게시글 클릭 시 처리 (비밀번호 체크)
  const handleArticleClick = (article) => {
    if (article.locked) {
      setSelectedArticle(article);
      setOpen(true);
    } else {
      navigate(`${currentPath}/detail/${article.id}`);
    }
  };
  useEffect(() => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    setPosts(storedPosts);
  }, []);

  // ✅ 비밀번호 확인
  const handleCheckPassword = () => {
    if (selectedArticle && selectedArticle.password === password) {
      navigate(`${currentPath}/detail/${selectedArticle.id}`);
      setOpen(false);
      setPassword("");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

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
        {filteredArticles.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((article) => (
          <Grid
            item
            xs={12}
            key={article.id}
            sx={{ width: "100%", cursor: "pointer" }}
            onClick={() => handleArticleClick(article)} // ✅ 비밀번호 확인 적용
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

      {/* ✅ 비밀번호 입력 모달 */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>비밀번호 입력</DialogTitle>
        <DialogContent>
          <TextField
            type="password"
            label="비밀번호 (4자리 숫자)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            inputProps={{ maxLength: 4 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>취소</Button>
          <Button onClick={handleCheckPassword} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
