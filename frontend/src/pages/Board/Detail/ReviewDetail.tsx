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

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // localStorage에서 저장된 리뷰 가져오기
  const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

  // 더미 데이터 (기존과 동일)
  const dummyReviews = Array.from({ length: 20 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return {
      id: index + 1,
      user: {
        name: `CameraUser${index + 1}`,
        avatar: "/static/images/avatar/default.png",
      },
      rating: Math.floor(Math.random() * 5) + 1,
      images: [
        "https://placehold.co/200?text=Image1",
        "https://placehold.co/200?text=Image2",
        "https://placehold.co/200?text=Image3",
      ],
      content: [
        "이 카메라는 야외 촬영 시 뛰어난 화질을 제공합니다. 저조도 환경에서도 선명한 사진을 찍을 수 있어 만족스럽습니다.",
        "렌즈 교체가 쉽고 무게도 가벼워 여행용으로 적합합니다. 배터리 수명도 긴 편이라 하루 종일 촬영할 수 있습니다.",
        "AF 속도가 빠르고 컬러 표현이 정확합니다. 단, 동영상 촬영 시 발열이 약간 발생할 수 있습니다.",
        "터치스크린이 반응이 빠르고 조작이 편리합니다. 초보자도 쉽게 사용할 수 있는 인터페이스가 강점입니다.",
        "사진의 디테일이 뛰어나고 색감도 자연스럽습니다. 하지만 가격이 다소 비싸다는 점이 단점입니다.",
      ][index % 5],
      createdAt: date.toISOString(),
    };
  });

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

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 3,
        textAlign: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#000000" }}>
        리뷰 상세 페이지
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: 1,
          minWidth: 250,
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
            sx={{ width: "100%", height: 300, objectFit: "cover", mb: 2 }}
          />
        ))}
        <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default ReviewDetail;