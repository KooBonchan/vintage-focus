import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Switch, FormControlLabel, useTheme } from "@mui/material";
import { Post } from "../../../types/post";
import CustomButton from "../../../components/CustomButton"; // Importing CustomButton

export default function BuyWrite() {
  const navigate = useNavigate();
  const theme = useTheme(); // Access current theme

  // 게시글 데이터 상태 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true); // 공개/비공개 상태 (기본값: 공개, 스위치 비활성화)
  const [password, setPassword] = useState(""); // 비밀번호 (비공개 시 필수)

  // 스위치 상태 변경 핸들러 (논리 반대로 설정)
  const handleSwitchChange = (e) => {
    const newIsPublic = !e.target.checked; // 스위치가 체크되면 isPublic을 false로 설정
    console.log("isPublic changed to:", newIsPublic); // 디버깅 로그
    setIsPublic(newIsPublic);
  };

  // 게시글 등록 함수
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    if (!isPublic && password.length !== 4) {
      alert("비밀번호는 4자리 숫자로 입력해주세요!");
      return;
    }

    // 현재 시간 (KST) 기준으로 저장
    const now = new Date();
    const formattedDate = now.toISOString();

    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      date: formattedDate,
      views: 0,
      author: { name: "구매희망자", avatar: "/static/images/avatar/default.png" },
      tag: "구매문의",
      locked: !isPublic, // locked는 isPublic의 반대값
      password: !isPublic ? password : undefined, // 비공개일 때만 비밀번호 저장
    };

    const posts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    sessionStorage.setItem("posts", JSON.stringify([newPost, ...posts]));

    alert("게시글이 성공적으로 등록되었습니다.");
    navigate("/buy-inquiry");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : 'white', // Dark mode background
        color: theme.palette.mode === 'dark' ? 'white' : 'black', // Dark mode text color
        padding: 3,
        borderRadius: "8px",
        border: `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#808080'}`, // Light mode border is gray
      }}
    >
      {/* 공개/비공개 설정 (오른쪽 정렬로 제목 위로 이동) */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>공개/비공개</Typography>
          <FormControlLabel
            control={<Switch checked={!isPublic} onChange={handleSwitchChange} />}
            label=""
            sx={{ m: 0 }}
          />
        </Box>
      </Box>

      {/* 제목 입력 */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="제목"
          variant="outlined"
          size="small"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.mode === 'dark' ? '#555' : 'white', // Dark mode input background
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.mode === 'dark' ? 'white' : 'black', // Dark mode label color
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.mode === 'dark' ? 'white' : '#808080', // Light mode border is gray
            },
          }}
        />
      </Box>

      {/* 문의 내용 */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="문의 내용"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.mode === 'dark' ? '#555' : 'white', // Dark mode input background
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.mode === 'dark' ? 'white' : 'black', // Dark mode label color
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.mode === 'dark' ? 'white' : '#808080', // Light mode border is gray
            },
          }}
        />
      </Box>

      {/* 비밀번호 입력 (비공개일 경우) */}
      {!isPublic && (
        <Box sx={{ mb: 3 }}>
          <TextField
            label="비밀번호 (4자리 숫자)"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, "");
              if (e.target.value !== input) {
                alert("비밀번호는 숫자만 입력 가능합니다!");
              }
              if (input.length <= 4) {
                setPassword(input);
              }
            }}
            inputProps={{ maxLength: 4, pattern: "[0-9]*" }}
            sx={{
              mt: 1,
              maxWidth: "300px",
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.palette.mode === 'dark' ? '#555' : 'white', // Dark mode input background
              },
              "& .MuiInputLabel-root": {
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Dark mode label color
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.mode === 'dark' ? 'white' : '#808080', // Light mode border is gray
              },
            }}
          />
        </Box>
      )}

      {/* 게시글 등록하기 버튼 */}
      <CustomButton
        label="게시글 등록하기"
        size="colorkingbiglarge" // Use the size prop as per your specification
        onClick={handleSubmit} // Submit the form on button click
      />

      {/* 이미지 추가 */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
        <img
          src="/image/notice/mooni2.jpg" // Use relative path to the image
          alt="공지사항"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
}

// /* buy 안내사항 
// <Box sx={{ backgroundColor: "#e3f2fd", padding: 2, borderRadius: 2, mb: 3 }}>
// <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
//   안내사항
// </Typography>
// <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
//   <Typography variant="body1" color="text.primary">
//     ※ 최종 구매 상담은 빈티지포커스 고객센터에서 고객님께 연락을 드려 유선 상담 후에 확정됩니다.
//   </Typography>
//   <Typography variant="body1" color="text.primary">
//     ※ 변경 사항이 있을 시 게시글을 수정하시면 담당 직원의 확인이 어렵습니다. 번거롭더라도 게시글을 새롭게 작성해 주세요.
//   </Typography>
//   <Typography variant="body1" color="text.primary">
//     ※ 기타 문의사항은 고객센터 <strong>(1588-5454)</strong> 로 연락 주시면 친절히 상담해 드리겠습니다.
//   </Typography>
// </Box>
// </Box>