import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Avatar, Card, CardMedia, CardContent, Rating, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from '../../components/CustomButton'; // adjust path
import { dummyReviews } from "./dummyReviews";

const Reviews = () => {
  const navigate = useNavigate();
  const theme = useTheme(); // Hook to access the current theme

  // localStorage에서 리뷰 가져오기
  const [reviews, setReviews] = useState(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    return [...savedReviews, ...dummyReviews];
  });

  const [visibleReviews, setVisibleReviews] = useState(reviews.slice(0, 4));
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
    const sorted = sortReviews(reviews, sortOption);
    setVisibleReviews(sorted.slice(0, page * 4));
  }, [sortOption, page, reviews]);

  const loadMoreReviews = () => {
    const nextPage = page + 1;
    const sorted = sortReviews(reviews, sortOption);
    const nextReviews = sorted.slice(0, nextPage * 4);
    setVisibleReviews(nextReviews);
    setPage(nextPage);
  };
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleReviews.length < reviews.length) {
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
        backgroundColor: theme.palette.mode === "dark" ? "none" : "#ffffff", // Conditional background
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}>
        카메라 리뷰 페이지
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}>
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
        <CustomButton
          label="최근 거래순"
          size="medium"
          onClick={() => { setSortOption("recent"); }}
        />
        <CustomButton
          label="오래된 거래순"
          size="medium"
          onClick={() => { setSortOption("oldest"); }}
        />
        <CustomButton
          label="평점 높은순"
          size="medium"
          onClick={() => { setSortOption("ratingHigh"); }}
        />
        <CustomButton
          label="평점 낮은순"
          size="medium"
          onClick={() => { setSortOption("ratingLow"); }}
        />
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
              backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#ffffff", // Dark mode background color
              borderRadius: 2,
              boxShadow: 1,
              minWidth: 250,
              cursor: "pointer",
              height: "100%", // 카드 높이를 유연하게 설정
            }}
            onClick={() => navigate(`/reviews/${review.id}/`)}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar src={review.user.avatar} sx={{ mr: 1 }} />
              <Typography variant="subtitle1" sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}>
                {review.user.name}
              </Typography>
            </Box>
            <Rating value={review.rating} readOnly sx={{ mb: 1 }} />
            { review.images.length > 0 &&
            <CardMedia
              component="img"
              image={review.images[0]} // 첫 번째 사진 표시
              alt={`Camera Review ${review.id}`}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "contain", // contain으로 변경하여 전체 이미지 표시
                backgroundColor: "#f0f0f0", // 빈 공간 채우기
                mb: 1,
              }}
            />  
            }
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                textAlign: "center",
                padding: 0, // 기본 패딩 제거
                height: "100%", // CardContent도 높이를 채우도록 설정
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", mb: 2 }}>
                  {formatReviewContent(review.content)}
                </Typography>
              </Box>
              {/* 작성 날짜를 하단에 고정 */}
              <Typography
                variant="body1"
                sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", mt: "auto", paddingTop: 1 }}
              >
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
