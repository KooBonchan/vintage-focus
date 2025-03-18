import React, { useState } from "react";
import { Box, Typography, Avatar, Button, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

const MyPage = () => {
  const navigate = useNavigate();
  // const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");

  const {user} = useAuthStore();

  const profileImage = user?.profileImage;
  
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
          <ListItem button sx={{ "&:hover": { backgroundColor: "#f0f0f0" }, cursor: "pointer" }}>
            <ListItemText primary="배송 조회" />
          </ListItem>
          <ListItem button sx={{ "&:hover": { backgroundColor: "#f0f0f0" }, cursor: "pointer" }}>
            <ListItemText primary="쿠폰함" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/write-review")}
            sx={{ "&:hover": { backgroundColor: "#f0f0f0" }, cursor: "pointer" }}
          >
            <ListItemText primary="리뷰 작성" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/mypage/edit-reviews/")}
            sx={{ "&:hover": { backgroundColor: "#f0f0f0" }, cursor: "pointer" }}
          >
            <ListItemText primary="내 리뷰 수정하기" />
          </ListItem>
        </List>
      </Box>

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
          <Typography variant="h4">
            {user?.username ?? "로그인해주세요."}
          </Typography>
          {/* <input
            id="profile-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          /> */}
        </label>
        {/* <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
          프로필 사진을 클릭하여 변경하세요
        </Typography> */}
      </Box>
    </Box>
  );
};

export default MyPage;