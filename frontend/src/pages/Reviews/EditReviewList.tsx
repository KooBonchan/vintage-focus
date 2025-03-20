import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Button, Rating, CardMedia } from "@mui/material";

const EditReviewList = () => {
  const navigate = useNavigate();
  const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

  // 리뷰 삭제 함수
  const handleDeleteReview = (reviewId) => {
    // 삭제 확인
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      // 현재 리뷰 목록에서 선택한 리뷰를 제외한 새 배열 생성
      const updatedReviews = savedReviews.filter(review => review.id !== reviewId);
      // localStorage 업데이트
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
      // 페이지 새로고침
      window.location.reload();
    }
  };

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
            
            { review.images && review.images.length > 0 ?
              <CardMedia
                component="img"
                image={review.images[0]} // 첫 번째 사진 표시
                alt={`Camera Review ${review.id}`}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "contain", // contain으로 변경하여 전체 이미지 표시
                  backgroundColor: "#f0f0f0", // 빈 공간 채우기
                  mr: 2,
                }}
              />
              :
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
              <Typography>이미지 없음</Typography>

            </Box>
            }
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/mypage/edit-reviews/${review.id}`)}
              >
                수정
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteReview(review.id)}
              >
                삭제
              </Button>
            </Box>
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