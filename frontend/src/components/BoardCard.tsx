import React, { useState } from "react";
import { Box, Typography, Card, Avatar, Modal, TextField, Button } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

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
  iconVisible?: boolean;
  tagVisible?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  fontSize?: string;
  authorAvatarSize?: number;
  viewsCountColor?: string;
  onUnlock?: (id: number, password: string) => void;
  isManager?: boolean;
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
  borderColor = "#ddd",
  fontSize = "1rem",
  authorAvatarSize = 40,
  viewsCountColor = "text.secondary",
  onUnlock,
  isManager = false,
}) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUnlock = () => {
    if (article?.id && onUnlock) {
      onUnlock(article.id, password);
      setPassword("");
      handleClose();
    }
  };

  const handleClick = () => {
    if (article?.locked) {
      handleOpen();
    }
  };

  return (
    <>
      <Card
        sx={{
          p: 2,
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          boxShadow: isManager ? "0 8px 20px rgba(0, 0, 0, 0.2)" : "none",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          position: "relative",
          backgroundColor: isManager ? "#445366" : (highlighted ? "#f0f8ff" : backgroundColor),
          color: isManager ? "#FFFFFF" : "inherit",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: isManager ? "0 6px 15px rgba(0, 0, 0, 0.3)" : "0 4px 10px rgba(161, 161, 161, 0.2)",
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
            <LockIcon
              sx={{ color: isManager ? "#FFFFFF" : "inherit", fontSize: 28 }}
            />
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
          <Typography
            variant="caption"
            sx={{ color: isManager ? "#FFFFFF" : "text.secondary" }}
          >
            {formatDate(article?.date)} • 조회수{" "}
            <span style={{ color: isManager ? "#FFFFFF" : viewsCountColor }}>{article?.views}</span>
          </Typography>
        </Box>

        {tagVisible && article?.tag && (
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="caption"
              color={isManager ? "#FFFFFF" : "text.primary"}
            >
              #{article.tag}
            </Typography>
          </Box>
        )}
      </Card>

      <Modal open={open} onClose={handleClose} BackdropProps={{ style: { backgroundColor: 'transparent' } }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: "0 4px 8px rgba(83, 83, 83, 0.15)", // 그림자 강도 조절
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" color={isManager ? "#FFFFFF" : "inherit"}>비밀번호 입력</Typography>
          <TextField
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleUnlock}>
            확인
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default BoardCard;