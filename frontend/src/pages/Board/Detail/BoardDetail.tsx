import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";


const articleInfo = {};

export default function BoardDetail() {
  const { id } = useParams(); // URL의 id 가져오기
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 해당 id의 게시글 찾기
  const article = articleInfo.find((item) => item.id === Number(id));

  if (!article) {
    return <Typography variant="h6">해당 문의를 찾을 수 없습니다.</Typography>;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 800, margin: "0 auto", p: 2 }}>
      {/* 🔹 뒤로 가기 버튼 */}
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
        목록으로 돌아가기
      </Button>

      {/* 🔹 제목 및 잠금 아이콘 */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
        {article.title} <LockIcon fontSize="small" />
      </Typography>

      {/* 🔹 작성자 정보 */}
      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
        작성자: {article.authors[0].name} | {article.date} | 조회수 {article.views}
      </Typography>

      {/* 🔹 문의 내용 (더미 데이터) */}
      <Typography variant="body1" sx={{ mt: 3 }}>
        이곳에 해당 문의의 자세한 내용이 표시됩니다.  
        (데모 버전이므로 실제 내용은 없습니다.)
      </Typography>
    </Box>
  );
}
