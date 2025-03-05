import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Switch, FormControlLabel } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Write({
  title: initialTitle,
  price: initialPrice,
  content: initialContent,
  isPublic: initialIsPublic,
  password: initialPassword,
  buttonColor,
  backgroundColor,
  textColor,
}) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialTitle || "");
  const [price, setPrice] = useState(initialPrice || "");
  const [content, setContent] = useState(initialContent || "");
  const [isPublic, setIsPublic] = useState(initialIsPublic !== undefined ? initialIsPublic : true);
  const [password, setPassword] = useState(initialPassword || "");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    if (!isPublic && password.length !== 4) {
      alert("비밀번호는 4자리 숫자로 입력해주세요.");
      return;
    }

    const now = new Date();
    const formattedDate = now.toISOString();

    const newPost = {
      id: Date.now(),
      title,
      price,
      content,
      date: formattedDate,
      views: 0,
      authors: [{ name: "판매자", avatar: "/static/images/avatar/default.png" }],
      tag: "대여문의",
      locked: !isPublic,
      password: isPublic ? null : password,
    };

    if (process.env.NODE_ENV !== 'test') {
      const posts = JSON.parse(sessionStorage.getItem("posts") || "[]");
      sessionStorage.setItem("posts", JSON.stringify([newPost, ...posts]));
      navigate("/rental-inquiry");
    }
  };

  return (
    <Box sx={{ ...styles.container, backgroundColor }}>
      <ProductInfo title={title} price={price} setTitle={setTitle} setPrice={setPrice} />
      <ContentInput content={content} setContent={setContent} />
      <PrivacySettings
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        password={password}
        setPassword={setPassword}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ backgroundColor: buttonColor }}
      >
        게시글 등록하기
      </Button>
    </Box>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
    padding: 3,
    borderRadius: "8px",
  },
  imageBox: {
    width: 120,
    height: 120,
    backgroundColor: "#E0E0E0",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
};

const ProductInfo = ({ title, price, setTitle, setPrice }) => (
  <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mb: 3 }}>
    <Box sx={styles.imageBox}>
      <FavoriteBorderIcon sx={{ position: "absolute", top: 8, left: 8 }} />
      <Typography variant="body2" color="textSecondary">이미지</Typography>
    </Box>
    <Box sx={{ flex: 1 }}>
      <TextField
        label="제목"
        variant="outlined"
        size="small"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 1 }}
      />
      <TextField
        label="상품 가격 (원)"
        variant="outlined"
        size="small"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        sx={{ mb: 1 }}
      />
    </Box>
  </Box>
);

const ContentInput = ({ content, setContent }) => (
  <Box sx={{ backgroundColor: "white", p: 2, borderRadius: "8px", mb: 3 }}>
    <TextField
      label="문의 내용"
      multiline
      rows={4}
      variant="outlined"
      fullWidth
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  </Box>
);

const PrivacySettings = ({ isPublic, setIsPublic, password, setPassword }) => (
  <Box sx={{ backgroundColor: "white", p: 2, borderRadius: "8px", mb: 3 }}>
    <FormControlLabel
      control={<Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />}
      label="공개/비공개"
    />
    {!isPublic && (
      <TextField
        label="비밀번호 (4자리 숫자)"
        type="password"
        variant="outlined"
        size="small"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mt: 1 }}
      />
    )}
  </Box>
);