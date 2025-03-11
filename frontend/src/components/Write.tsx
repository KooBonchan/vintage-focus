import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Switch, FormControlLabel } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LockIcon from "@mui/icons-material/Lock";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ImageIcon from "@mui/icons-material/Image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Write({
  title: initialTitle,
  price: initialPrice,
  content: initialContent,
  isPublic: initialIsPublic,
  password: initialPassword,
  buttonColor,
  backgroundColor,
  textColor,
  link,
}) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialTitle || "");
  const [price, setPrice] = useState(initialPrice || "");
  const [content, setContent] = useState(initialContent || "");
  const [isPublic, setIsPublic] = useState(initialIsPublic !== undefined ? initialIsPublic : true);
  const [password, setPassword] = useState(initialPassword || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
      image: image ? URL.createObjectURL(image) : null,
    };

    if (process.env.NODE_ENV !== 'test') {
      const posts = JSON.parse(sessionStorage.getItem("posts") || "[]");
      sessionStorage.setItem("posts", JSON.stringify([newPost, ...posts]));
      navigate("/rental-inquiry");
    }
  };

  const handleClick = () => {
    if (link) {
      navigate(link);
    } else {
      handleSubmit();
    }
  };

  return (
    <Box sx={{
      ...styles.container,
      backgroundColor: isPublic ? 'transparent' : '#f0f0f0',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      padding: 3,
      width: "100%",
    }}>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "860px",
        mb: 1,
      }}>
        <Typography variant="h5" component="h5" sx={{ display: "flex", alignItems: "center", fontWeight: 'bold', marginBottom: 2 }}> {/* marginBottom 추가 */}
          문의 <EditNoteIcon sx={{ ml: 0.5 }} />
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isPublic && <LockIcon sx={{ mr: 0.5 }} />}
          <FormControlLabel
            control={<Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />}
            label={isPublic ? "공개" : "비공개"}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mb: 2, width: "100%", maxWidth: "860px" }}>
        <ProductInfo
          title={title}
          price={price}
          setTitle={setTitle}
          setPrice={setPrice}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
        />
      </Box>
      <ContentInput content={content} setContent={setContent} isPublic={isPublic} />
      {!isPublic && (
        <PrivacySettings password={password} setPassword={setPassword} />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          backgroundColor: '#445366',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: '250px',
          padding: '8px 24px',
          borderRadius: '12px',
          marginTop: 2,
        }}
      >
        게시글 등록하기 <CheckCircleIcon sx={{ ml: 0.5 }} />
      </Button>
    </Box>
  );
}
const styles = {
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 3,
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBox: {
    width: 90,
    height: 90,
    backgroundColor: "#E0E0E0",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
};

const ProductInfo = ({ title, price, setTitle, setPrice, imagePreview, handleImageChange }) => (
  <Box sx={{ display: "flex", flexDirection: "row", gap: 3, flex: 1 }}>
    <Box sx={{ ...styles.imageBox }}>
      {imagePreview ? (
        <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
      ) : (
        <>
          <FavoriteBorderIcon sx={{ position: "absolute", top: 8, left: 8 }} />
          <ImageIcon />
        </>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", cursor: "pointer" }}
      />
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

const ContentInput = ({ content, setContent, isPublic }) => (
  <Box sx={{
    backgroundColor: isPublic ? "white" : "transparent",
    p: 2,
    borderRadius: "8px",
    mb: 0,
    width: "100%",
    maxWidth: "860px"
  }}>
    <TextField
      label="문의 내용"
      multiline
      rows={8}
      variant="outlined"
      fullWidth
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  </Box>
);

const PrivacySettings = ({ password, setPassword }) => (
  <Box sx={{
    backgroundColor: "transparent",
    p: 2,
    borderRadius: "8px",
    mb: 3,
    mt: 1
  }}>
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
  </Box>
);