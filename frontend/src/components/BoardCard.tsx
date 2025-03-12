import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Card, Avatar, Modal, TextField, Button } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom"; // react-router-dom 사용 시 필요

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
  link?: string; // 클릭 시 이동할 링크
  onClick?: () => void; // 새로 추가: 상위 컴포넌트에서 전달받은 클릭 이벤트 핸들러
}

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onUnlock: (password: string) => void;
  isManager?: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ open, onClose, onUnlock, isManager = false, modalRef }) => {
  const [password, setPassword] = useState("");

  const handleUnlockClick = () => {
    onUnlock(password);
    setPassword("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        ref={modalRef}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(133, 133, 133, 0.15)",
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
        <Button
          variant="contained"
          onClick={handleUnlockClick}
          sx={{
            backgroundColor: "#445366",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#334050",
            },
          }}
        >
          확인
        </Button>
      </Box>
    </Modal>
  );
};

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
  onUnlock,
  isManager = false,
  link,
  onClick, // 새로 추가
}) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // react-router-dom 사용 시 추가

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUnlock = (password: string) => {
    if (article?.id && onUnlock) {
      onUnlock(article.id, password);
    }
  };

  const handleClick = () => {
    if (article?.locked) {
      handleOpen(); // 잠긴 경우 모달 열기
    } else {
      if (onClick) {
        onClick(); // 상위 컴포넌트에서 전달된 클릭 이벤트 실행
      }
      if (link) {
        navigate(link); // 링크가 있으면 이동 (react-router-dom 사용 시)
        // window.location.href = link; // react-router-dom 없이 외부 URL로 이동 시 사용
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

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
          boxShadow: isManager ? "0 6px 15px rgba(0, 0, 0, 0.4)" : "0 4px 10px rgba(161, 161, 161, 0.2)",
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
          sx={{ color: isManager ? "#B0BEC5" : "text.secondary" }}
        >
          {formatDate(article?.date)} • 조회수{" "}
          <span style={{ color: isManager ? "#B0BEC5" : viewsCountColor }}>{article?.views}</span>
        </Typography>
      </Box>

      {tagVisible && article?.tag && (
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="caption"
            color={isManager ? "#B0BEC5" : "text.primary"}
          >
            #{article.tag}
          </Typography>
        </Box>
      )}

      {article?.locked && (
        <PasswordModal
          open={open}
          onClose={handleClose}
          onUnlock={handleUnlock}
          isManager={isManager}
          modalRef={modalRef}
        />
      )}
    </Card>
  );
};

export default BoardCard;