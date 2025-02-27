import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Switch, FormControlLabel } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function BuyWrite() {
  const navigate = useNavigate();
  
  // ✅ 게시글 데이터 상태 관리
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true); // 공개/비공개 상태
  const [password, setPassword] = useState(""); // 비밀번호 (비공개 시 필수)

  // ✅ 게시글 등록 함수
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    // 비공개 상태에서 비밀번호 미입력 시 경고
    if (!isPublic && password.length !== 4) {
      alert("비밀번호는 4자리 숫자로 입력해주세요.");
      return;
    }

    // 새 게시글 객체 생성
    const newPost = {
      id: Date.now(), // 유니크 ID 생성
      title,
      price,
      content,
      date: new Date().toISOString().split("T")[0], // 현재 날짜
      views: 0,
      authors: [{ name: "판매자", avatar: "/static/images/avatar/default.png" }],
      tag: "구매문의", // 판매문의 카테고리
      locked: !isPublic, // 비공개 여부
      password: isPublic ? null : password, // 비공개면 비밀번호 저장
    };

    // 로컬 스토리지에서 기존 데이터 가져오기
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    localStorage.setItem("posts", JSON.stringify([newPost, ...posts])); // 새 게시글 추가

    alert("게시글이 등록되었습니다.");
    navigate("/buy-inquiry"); // 등록 후 리스트 페이지로 이동
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        backgroundColor: "#F8F8F8",
        padding: 3,
        borderRadius: "8px",
      }}
    >
      {/* ✅ 제품 정보 */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mb: 3 }}>
        <Box
          sx={{
            width: 120,
            height: 120,
            backgroundColor: "#E0E0E0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
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

      {/* ✅ 문의 내용 */}
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

      {/* ✅ 게시물 공개 설정 */}
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

      {/* ✅ 등록 버튼 */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        게시글 등록하기
      </Button>
    </Box>
  );
}
