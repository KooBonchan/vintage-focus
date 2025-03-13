import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Rating,
  Card,
  CardMedia,
  CardContent,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const navigate = useNavigate();

  // ✅ 카메라 관련 더미 리뷰 데이터 (사진 배열 추가)
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
      ], // ✅ 3장의 사진 배열
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

  const [visibleReviews, setVisibleReviews] = useState(dummyReviews.slice(0, 4));
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("recent");
  const loader = useRef(null);

  const sortReviews = (reviews: typeof dummyReviews, option: string) => {
    const sortedReviews = [...reviews];
    switch (option) {
      case "ratingHigh":
        return sortedReviews.sort((a, b) => b.rating - a.rating);
      case "ratingLow":
        return sortedReviews.sort((a, b) => a.rating - b.rating);
      case "recent":
        return sortedReviews.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return sortedReviews.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return sortedReviews;
    }
  };

  useEffect(() => {
    const sorted = sortReviews(dummyReviews, sortOption);
    setVisibleReviews(sorted.slice(0, page * 4));
  }, [sortOption, page]);

  const loadMoreReviews = () => {
    const nextPage = page + 1;
    const sorted = sortReviews(dummyReviews, sortOption);
    const nextReviews = sorted.slice(0, nextPage * 4);
    setVisibleReviews(nextReviews);
    setPage(nextPage);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleReviews.length < dummyReviews.length) {
          loadMoreReviews();
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [visibleReviews.length, sortOption]);

  const formatReviewContent = (content: string) => {
    return (
      <div
        style={{
          display: "block",
          maxHeight: "4.5em",
          overflow: "hidden",
          position: "relative",
          lineHeight: "1.5em",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      >
        {content}
      </div>
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

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: 3,
        textAlign: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#000000" }}>
        카메라 리뷰 페이지
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: "#000000" }}>
        이곳에서 최신 카메라 제품의 리뷰를 확인할 수 있습니다.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "#ffffff",
            color: "#2196F3",
            border: "1px solid #2196F3",
            borderRadius: 20,
            padding: "8px 16px",
            textTransform: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            },
          }}
          onClick={() => { setSortOption("recent"); }}
        >
          최근 거래순
        </Button>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "#ffffff",
            color: "#2196F3",
            border: "1px solid #2196F3",
            borderRadius: 20,
            padding: "8px 16px",
            textTransform: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            },
          }}
          onClick={() => { setSortOption("oldest"); }}
        >
          오래된 거래순
        </Button>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "#ffffff",
            color: "#2196F3",
            border: "1px solid #2196F3",
            borderRadius: 20,
            padding: "8px 16px",
            textTransform: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            },
          }}
          onClick={() => { setSortOption("ratingHigh"); }}
        >
          평점 높은순
        </Button>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "#ffffff",
            color: "#2196F3",
            border: "1px solid #2196F3",
            borderRadius: 20,
            padding: "8px 16px",
            textTransform: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            },
          }}
          onClick={() => { setSortOption("ratingLow"); }}
        >
          평점 낮은순
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(250px, 1fr))",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {visibleReviews.map((review) => (
          <Card
            key={review.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              boxShadow: 1,
              minWidth: 250,
              cursor: "pointer",
            }}
            onClick={() => navigate(`/reviews/${review.id}/`)}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar src={review.user.avatar} sx={{ mr: 1 }} />
              <Typography variant="subtitle1" sx={{ color: "#000000" }}>
                {review.user.name}
              </Typography>
            </Box>
            <Rating value={review.rating} readOnly sx={{ mb: 1 }} />
            <CardMedia
              component="img"
              image={review.images[0]} // ✅ 첫 번째 사진만 표시
              alt={`Camera Review ${review.id}`}
              sx={{ width: "100%", height: 200, objectFit: "cover", mb: 1 }}
            />
            <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
              <Typography variant="body2" sx={{ color: "#000000", mb: 1 }}>
                {formatReviewContent(review.content)}
              </Typography>
              <Typography variant="body1" sx={{ color: "#666666" }}>
                작성 날짜: {formatDate(review.createdAt)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <div ref={loader} style={{ height: "20px" }} />

   
    </Box>
  );
};

export default Reviews;