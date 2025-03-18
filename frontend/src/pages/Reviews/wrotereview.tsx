import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField, Rating, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuthStore from "@/stores/authStore";

const WroteReview = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const {user} = useAuthStore();

  // ✅ 파일을 Base64로 변환하는 함수 추가
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // ✅ 이미지 업로드 핸들러 (Base64 변환 후 저장)
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = await Promise.all(
        Array.from(event.target.files)
          .slice(0, 3 - images.length)
          .map((file) => readFileAsBase64(file))
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // ✅ 리뷰 저장 (Base64 이미지 포함)
  const handleSubmitReview = () => {
    const newReview = {
      id: Date.now(),
      user: {
        name: user?.username ?? "CurrentUser",
        avatar: user?.profileImage ?? "/static/images/avatar/default.png",
      },
      rating,
      images,
      content: reviewText,
      createdAt: new Date().toISOString(),
    };

    // 기존 리뷰 가져오기
    const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const updatedReviews = [newReview, ...existingReviews];
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    alert("리뷰가 등록되었습니다!!");
    setRating(0);
    setReviewText("");
    setImages([]);
    navigate("/reviews/");
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>리뷰 작성 페이지 입니다.</Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>평점:</Typography>
      <Rating
        name="review-rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        sx={{ mb: 3 }}
      />
      <TextField
        label="리뷰를 작성해주세요"
        multiline
        rows={4}
        fullWidth
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Typography variant="body2" sx={{ mb: 1 }}>이미지 최대 3개 삽입 가능</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
        {images.map((src, index) => (
          <Box key={index} sx={{ position: "relative", width: 80, height: 80 }}>
            <img src={src} alt={`upload-${index}`} style={{ width: "100%", height: "100%", borderRadius: 5 }} />
            <IconButton
              size="small"
              onClick={() => handleDeleteImage(index)}
              sx={{ position: "absolute", top: 0, right: 0, color: "red" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        {images.length < 3 && (
          <label htmlFor="image-upload">
            <Box
              sx={{
                width: 80,
                height: 80,
                border: "2px dashed gray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              <AddPhotoAlternateIcon />
            </Box>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </label>
        )}
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmitReview} sx={{ mt: 2 }}>
        리뷰 등록하기
      </Button>
    </Box>
  );
};

export default WroteReview;
