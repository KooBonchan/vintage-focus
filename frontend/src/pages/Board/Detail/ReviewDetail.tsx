import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Rating,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { dummyReviews } from "@/pages/Reviews/dummyReviews";

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // localStorage에서 저장된 리뷰 가져오기
  const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

  // 저장된 리뷰와 더미 데이터를 결합 (ID는 문자열로 비교)
  const allReviews = [...savedReviews, ...dummyReviews];
  const review = allReviews.find((r) => String(r.id) === id);

  if (!review) {
    return (
      <Box sx={{ textAlign: "center", padding: 3, backgroundColor: "#ffffff" }}>
        <Typography variant="h6" sx={{ color: "#000000" }}>
          리뷰를 찾을 수 없습니다.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/reviews/")}
          sx={{ mt: 2 }}
        >
          리뷰 목록으로 돌아가기
        </Button>
      </Box>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <Box
      sx={{
        maxWidth: "100%", // 전체 너비를 화면에 맞춤
        margin: 0, // 여백 제거
        padding: 0, // 패딩 제거
        textAlign: "center",
        backgroundColor: "#ffffff",
        height: "100vh", // 화면 전체 높이 사용
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto", // 내용이 넘칠 경우 스크롤 가능
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#000000", mb: 2 }}>
        리뷰 상세 페이지
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          boxShadow: 1,
          borderRadius: 2,
          width: "80%", // 카드 너비를 화면의 80%로 설정
          maxWidth: 800, // 최대 너비 제한
          margin: "0 auto", // 중앙 정렬
          padding: 2,
          overflow: "auto", // 내용이 넘칠 경우 스크롤
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar src={review.user.avatar} sx={{ mr: 1 }} />
          <Typography variant="subtitle1" sx={{ color: "#000000" }}>
            {review.user.name}
          </Typography>
        </Box>
        <Rating value={review.rating} readOnly sx={{ mb: 2 }} />
        {review.images.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            image={image}
            alt={`Review Image ${index + 1}`}
            sx={{
              width: "100%", // 너비를 100%로 설정
              height: "auto", // 높이를 자동으로 조정
              maxHeight: "60vh", // 화면 높이의 60%로 제한
              objectFit: "contain", // 비율 유지하며 전체 표시
              display: "block", // 블록 요소로 설정
              margin: 0, // 여백 제거
              padding: 0, // 패딩 제거
            }}
          />
        ))}
        <CardContent sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body1" sx={{ color: "#000000", mb: 2 }}>
            {review.content}
          </Typography>
          <Typography variant="body1" sx={{ color: "#666666" }}>
            작성 날짜: {formatDate(review.createdAt)}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/reviews/")}
        sx={{ mt: 2 }}
      >
        리뷰 목록으로 돌아가기
      </Button>
    </Box>
  );
};

export default ReviewDetail;