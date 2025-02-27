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
}

interface BoardCardProps {
  article: Article; // article prop을 정의
}

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
        <LockIcon fontSize="small" />
      </Box>

      {/* 아이디 및 게시 날짜, 조회수 */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 1 }}>
        <Typography variant="caption" color="text.primary" fontWeight="bold">
          {article.authors[0].name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {article.date} • 조회수 {article.views}
        </Typography>
      </Box>
    </Card>
  );
};

export default BoardCard;
