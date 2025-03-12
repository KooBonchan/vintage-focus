import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Rating,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

const EditReviewForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  const review = savedReviews.find((r) => String(r.id) === id);

  const [rating, setRating] = useState<number | null>(review?.rating || 0);
  const [reviewText, setReviewText] = useState(review?.content || "");
  const [images, setImages] = useState<string[]>(review?.images || []);

  useEffect(() => {
    if (!review) {
      navigate("/mypage/edit-reviews/");
    }
  }, [review, navigate]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files)
        .slice(0, 3 - images.length)
        .map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmitEdit = () => {
    const updatedReview = {
      ...review,
      rating,
      content: reviewText,
      images,
      createdAt: new Date().toISOString(),
    };

    const updatedReviews = savedReviews.map((r) =>
      String(r.id) === id ? updatedReview : r
    );
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    alert("리뷰가 수정되었습니다!");
    navigate("/reviews/");
  };

  if (!review) return null;

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        리뷰 수정 페이지입니다.
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        평점: ★ ★ ★ ★ ★
      </Typography>
      <Rating
        name="review-rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        sx={{ mb: 3 }}
      />
      <TextField
        label="리뷰를 수정해주세요"
        multiline
        rows={4}
        fullWidth
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Typography variant="body2" sx={{ mb: 1 }}>
        이미지 최대 3개 삽입 가능
      </Typography>
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
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmitEdit}>
          작성 완료
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/mypage/edit-reviews/")}
        >
          취소
        </Button>
      </Box>
    </Box>
  );
};

export default EditReviewForm;