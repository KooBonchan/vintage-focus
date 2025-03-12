import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Button, Rating } from "@mui/material";

const EditReviewList = () => {
  const navigate = useNavigate();
  const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

  if (savedReviews.length === 0) {
    return (
      <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          작성한 리뷰가 없습니다.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/write-review")}
        >
          리뷰 작성하러 가기
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        리뷰 수정 페이지입니다.
      </Typography>
      <List>
        {savedReviews.map((review) => (
          <ListItem
            key={review.id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Rating value={review.rating} readOnly sx={{ mr: 2 }} />
            <ListItemText
              primary={review.content.substring(0, 50) + "..."}
              secondary={`작성 날짜: ${new Date(review.createdAt).toLocaleDateString("ko-KR")}`}
              sx={{ flexGrow: 1 }}
            />
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Typography>미리보기</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/mypage/edit-reviews/${review.id}`)}
              sx={{ ml: 2 }}
            >
              수정
            </Button>
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/reviews/")}
        sx={{ mt: 2 }}
      >
        리뷰 목록으로 돌아가기
      </Button>
    </Box>
  );
};

export default EditReviewList;