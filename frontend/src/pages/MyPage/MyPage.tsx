import React, { useState } from "react";
import { Box, Typography, Avatar, Button, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150"); // 기본 프로필 이미지

  // 프로필 사진 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 5,
        padding: 3,
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* ✅ 왼쪽 사이드바 (고정 스크롤) */}
      <Box
        sx={{
          position: "sticky",
          top: 20,
          width: "250px",
          backgroundColor: "#f9f9f9",
          padding: 2,
          borderRadius: 2,
          boxShadow: 1,
          height: "fit-content",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          마이페이지
        </Typography>
        <List>
  <ListItem 
    button 
    sx={{ 
      "&:hover": { backgroundColor: "#f0f0f0" }, // 마우스 올릴 때 배경색 변경
      cursor: "pointer" // 커서를 손가락 모양으로 변경
    }}
  >
                    <ListItemText primary="배송 조회" />
                </ListItem>
                <ListItem 
                    button 
                    sx={{ 
                    "&:hover": { backgroundColor: "#f0f0f0" },
                    cursor: "pointer"
                    }}
                >
                    <ListItemText primary="쿠폰함" />
                </ListItem>
                <ListItem 
                    button 
                    onClick={() => navigate("/mypage/review/")}
                    sx={{ 
                    "&:hover": { backgroundColor: "#f0f0f0" },
                    cursor: "pointer"
                    }}
                >
                    <ListItemText primary="리뷰 작성" />
                </ListItem>
                <ListItem 
                    button 
                    sx={{ 
                    "&:hover": { backgroundColor: "#f0f0f0" },
                    cursor: "pointer"
                    }}
                >
                    <ListItemText primary="내 리뷰 수정하기" />
                </ListItem>
                </List>

      </Box>

      {/* ✅ 프로필 사진 변경 기능 */}
      <Box sx={{ textAlign: "center", flexGrow: 1 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          프로필 설정
        </Typography>
        <label htmlFor="profile-upload">
          <Avatar
            src={profileImage}
            sx={{
              width: 150,
              height: 150,
              cursor: "pointer",
              margin: "0 auto",
              boxShadow: 2,
            }}
          />
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>
        <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
          프로필 사진을 클릭하여 변경하세요
        </Typography>
      </Box>
    </Box>
  );
};

export default MyPage;
