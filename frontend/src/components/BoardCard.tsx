import React from "react";
import { Box, Typography, Card } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

// `article` prop을 받아서 사용하는 컴포넌트
export interface Author {
  name: string;
  avatar: string;
}

export interface Article {
  id: number;
  title: string;
  author: Author; // 단일 저자
  date: string;
  views: number;
  tag: string;
  locked?: boolean; // 🔒 비밀번호 잠금 여부
}

export interface BoardCardProps {
  article: Article; // article prop을 정의
  highlighted?: boolean; // 강조된 카드 여부
  iconVisible?: boolean; // 잠금 아이콘 표시 여부
  tagVisible?: boolean; // 태그 표시 여부
  backgroundColor?: string; // 카드 배경 색상
  borderColor?: string; // 카드 테두리 색상
  fontSize?: string; // 제목 폰트 크기
  authorAvatarSize?: number; // 작성자 아바타 크기
  viewsCountColor?: string; // 조회수 색상
}

// 날짜 포맷 함수
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

const BoardCard: React.FC<BoardCardProps> = ({
  article,
  highlighted = false,
  iconVisible = true,
  tagVisible = true,
  backgroundColor = "#fff",
  borderColor = "#ddd",
  fontSize = "1rem",
  authorAvatarSize = 40,
  viewsCountColor = "text.secondary",
}) => {
  return (
    <Card
      sx={{
        p: 2,
        border: `1px solid ${borderColor}`,
        borderRadius: "8px",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        position: "relative",
        backgroundColor: highlighted ? "#f0f8ff" : backgroundColor, // 강조된 카드는 배경 색상 변경
        transition: "box-shadow 0.3s ease-in-out", // 부드러운 전환
        "&:hover": {
          boxShadow: "0 4px 10px rgba(161, 161, 161, 0.2)", // 마우스 오버 시 그림자 효과
        },
      }}
    >
      {/* 제목 & 잠금 아이콘 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize }}>
          {article.title}
        </Typography>
        {article.locked && iconVisible && <LockIcon fontSize="small" />}
      </Box>

      {/* 작성자 및 날짜, 조회수 */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 1 }}>
        {/* 단일 저자 표시 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src={article.author.avatar}
            alt={article.author.name}
            style={{
              width: authorAvatarSize,
              height: authorAvatarSize,
              borderRadius: "50%",
            }}
          />
          <Typography variant="caption" color="text.primary" fontWeight="bold">
            {article.author.name}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {formatDate(article.date)} • 조회수{" "}
          <span style={{ color: viewsCountColor }}>{article.views}</span>
        </Typography>
      </Box>

      {/* 태그 표시 */}
      {tagVisible && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.primary">
            #{article.tag}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default BoardCard;
