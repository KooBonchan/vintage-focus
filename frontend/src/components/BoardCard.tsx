import React from "react";
import { Box, Typography, Card, Avatar } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

export interface Author {
  name: string;
  avatar?: string;
}

export interface Article {
  id?: number;
  title: string;
  author: Author;
  date?: string;
  views?: number;
  tag?: string;
  locked?: boolean;
}

export interface BoardCardProps {
  article?: Article;
  highlighted?: boolean;
  tagVisible?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  fontSize?: string;
  authorAvatarSize?: number;
  viewsCountColor?: string;
  isManager?: boolean;
  link?: string;
  onClick?: () => void;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "날짜 없음";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
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
  tagVisible = true,
  backgroundColor = "#fff",
  borderColor = "#909eb0",
  fontSize = "1rem",
  authorAvatarSize = 40,
  viewsCountColor = "text.secondary",
  isManager = false,
  link,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // 상위 컴포넌트에서 전달된 클릭 핸들러 호출
    } else if (!article?.locked && link) {
      navigate(link); // 잠기지 않은 경우에만 링크로 이동
    }
  };

  return (
    <Card
      sx={{
        p: 2,
        border: `1px solid ${borderColor}`,
        borderRadius: "8px",
        boxShadow: isManager ? "0 8px 20px rgba(0, 0, 0, 0.3)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        position: "relative",
        backgroundColor: highlighted ? "#f0f8ff" : backgroundColor,
        color: isManager ? "#FFFFFF" : "inherit",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: isManager
            ? "0 6px 15px rgba(0, 0, 0, 0.4)"
            : "0 4px 10px rgba(161, 161, 161, 0.2)",
        },
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ fontSize, color: isManager ? "#FFFFFF" : "inherit" }}
        >
          {article?.title}
        </Typography>
        {article?.locked && (
          <LockIcon sx={{ color: isManager ? "#FFFFFF" : "inherit", fontSize: 28 }} />
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={article?.author.avatar ?? "https://avatar.iran.liara.run/public"}
            sx={{ width: authorAvatarSize, height: authorAvatarSize }}
          />
          <Typography
            variant="caption"
            color={isManager ? "#FFFFFF" : "text.primary"}
            fontWeight="bold"
          >
            {article?.author.name}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: isManager ? "#B0BEC5" : "text.secondary" }}>
          {formatDate(article?.date)} • 조회수{" "}
          <span style={{ color: isManager ? "#B0BEC5" : viewsCountColor }}>{article?.views}</span>
        </Typography>
      </Box>

      {tagVisible && article?.tag && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color={isManager ? "#B0BEC5" : "text.primary"}>
            #{article.tag}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default BoardCard;