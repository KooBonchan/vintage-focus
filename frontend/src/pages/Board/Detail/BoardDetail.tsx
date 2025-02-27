import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const foundArticle = posts.find((item) => item.id === Number(id));

    if (foundArticle) {
      // ✅ 조회수 증가 후 로컬 스토리지 업데이트
      foundArticle.views += 1;
      localStorage.setItem("posts", JSON.stringify(posts));
      setArticle(foundArticle);
    }
  }, [id]);

  if (!article) {
    return <Typography variant="h6">해당 게시글을 찾을 수 없습니다.</Typography>;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 800, margin: "0 auto", p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
        목록으로 돌아가기
      </Button>

      <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
        {article.title}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
        작성자: {article.authors[0].name} | {article.date} | 조회수 {article.views}
      </Typography>

      <Typography variant="body1" sx={{ mt: 3 }}>{article.content}</Typography>
    </Box>
  );
}
