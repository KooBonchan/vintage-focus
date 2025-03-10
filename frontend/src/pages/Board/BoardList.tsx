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
  Modal,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useLocation } from "react-router-dom";
import BoardCard from "../../components/BoardCard";

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
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [inputPassword, setInputPassword] = useState("");
  const itemsPerPage = 8;

  // 현재 경로 설정
  const currentPath = location.pathname;
  // /rental-inquiry가 아닌 경우에만 "문의하기" 박스를 렌더링
  const showInquiryBox = currentPath !== "/rental-inquiry";
  const selectedTab = categoryRoutes[currentPath] || "구매문의";

  // 게시물 데이터 로드
  useEffect(() => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    setPosts(storedPosts);
  }, []);

  // 선택된 탭에 맞는 게시물 필터링
  const filteredArticles = posts.filter((article) => article.tag === selectedTab);

  // 게시물 클릭 핸들러
  const handleArticleClick = (article) => {
    if (article.locked) {
      setSelectedArticle(article);
      setOpenPasswordModal(true);
    } else {
      navigate(`${currentPath}/detail/${article.id}`);
    }
  };

  // 비밀번호 제출 핸들러
  const handlePasswordSubmit = () => {
    if (selectedArticle && selectedArticle.password === inputPassword) {
      console.log("Password correct, navigating with unlocked=true");
      setOpenPasswordModal(false);
      setInputPassword("");
      navigate(`${currentPath}/detail/${selectedArticle.id}?unlocked=true`);
    } else {
      alert("비밀번호가 틀렸습니다.");
      setInputPassword("");
    }
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setOpenPasswordModal(false);
    setInputPassword("");
    setSelectedArticle(null);
  };

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // 숫자만 허용
    if (input.length <= 4) {
      setInputPassword(input);
    }
    if (e.target.value !== input) {
      alert("숫자만 입력 가능합니다.");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1000, margin: "0 auto", textAlign: "center", p: 2 }}>
      {/* 탭 영역 */}
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

      {/* 문의하기 박스 (조건부 렌더링) */}
      {showInquiryBox && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 2 }}>
          <IconButton sx={{ mr: 1 }} onClick={() => navigate(`${currentPath}/write`)}>
            <EditIcon />
          </IconButton>
          <Typography
            variant="body1"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`${currentPath}/write`)}
          >
            문의하기
          </Typography>
        </Box>
      )}

      {/* 게시물 목록 */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {filteredArticles
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((article) => (
            <Grid
              item
              xs={12}
              key={article.id}
              sx={{ width: "100%", cursor: "pointer" }}
              onClick={() => handleArticleClick(article)}
            >
              <BoardCard article={article} />
            </Grid>
          ))}
      </Grid>

      {/* 페이지네이션 */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredArticles.length / itemsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* 비밀번호 입력 모달 */}
      <Modal open={openPasswordModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            비밀번호 입력 (4자리 숫자)
          </Typography>
          <TextField
            type="password"
            label="비밀번호"
            variant="outlined"
            value={inputPassword}
            onChange={handlePasswordChange}
            inputProps={{ maxLength: 4, pattern: "[0-9]*" }} // 최대 4자리, 숫자만
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={handlePasswordSubmit}>
              확인
            </Button>
            <Button variant="outlined" onClick={handleModalClose}>
              취소
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}