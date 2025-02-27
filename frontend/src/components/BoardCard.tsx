import React from "react";
import { Box, Typography, Card } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

// `article` prop을 받아서 사용하는 컴포넌트
interface Article {
  id: number;
  title: string;
  authors: { name: string; avatar: string }[];
  date: string;
  views: number;
  tag: string;
  locked?: boolean; // 🔒 비밀번호 잠금 여부
}

interface BoardCardProps {
  article: Article;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "날짜 없음";
  
  // ✅ 저장된 ISO 날짜를 변환
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date"; // 오류 방지

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const BoardCard: React.FC<BoardCardProps> = ({ article }) => {
  return (
    <Card
      sx={{
        p: 2,
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        position: "relative",
      }}
    >
      {/* 제목 & 잠금 아이콘 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {article.title}
        </Typography>
        {article.locked && <LockIcon fontSize="small" />}
      </Box>

      {/* 작성자 및 날짜, 조회수 */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 1 }}>
        <Typography variant="caption" color="text.primary" fontWeight="bold">
          {article.authors[0].name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatDate(article.date)} • 조회수 {article.views}
        </Typography>
      </Box>
    </Card>
  );
};
export default BoardCard;
