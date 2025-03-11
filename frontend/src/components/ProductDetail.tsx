import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { ChatBubbleOutline, FavoriteBorder, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    shipping: number;
    imageSrc: string; // Storybook과 일치하도록 imageSrc로 변경
  };
  title?: string;
  description?: string;
  buttonBackgroundColor?: string;
  buyLink?: string;
  cartLink?: string;
  inquiryLink?: string;
  isAdmin?: boolean; // 관리자 모드 여부를 확인하는 prop 추가
}

export function ProductDetail({
  product,
  title,
  description,
  buttonBackgroundColor,
  buyLink,
  cartLink,
  inquiryLink,
  isAdmin = false,
}: ProductDetailProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [imageFile, setImageFile] = useState<File | null>(null); // 업로드된 이미지 파일 상태
  const [imagePreview, setImagePreview] = useState<string>(product.imageSrc); // 이미지 미리보기 URL

  // 장바구니 추가
  const handleAddToCart = () => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push({ ...product, quantity });
      localStorage.setItem("cart", JSON.stringify(cart));
      setOpen(true);
    } catch (error) {
      console.error("장바구니 저장 오류:", error);
    }
  };

  // 수량 증가
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  // 수량 감소
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  // 수량 직접 입력
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // 이미지 저장 핸들러 (서버로 업로드 로직 추가 필요)
  const handleSaveImage = () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      console.log("이미지 업로드:", imageFile);

      // 서버로 업로드 로직 (예시)
      // fetch('/api/upload', { method: 'POST', body: formData })
      //   .then(response => response.json())
      //   .then(data => {
      //     setImagePreview(data.imageUrl); // 서버에서 반환된 URL로 업데이트
      //     alert("이미지가 업로드되었습니다!");
      //   })
      //   .catch(error => console.error("이미지 업로드 오류:", error));

      alert("이미지가 저장되었습니다! (서버 업로드 로직은 구현 필요)");
      setImageFile(null); // 업로드 후 상태 초기화
    }
  };

  // 컴포넌트 언마운트 시 미리보기 URL 해제
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== product.imageSrc) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, product.imageSrc]);

  const buttonStyle = {
    borderRadius: "3em",
    color: "#445366",
    padding: "5px 16px",
    fontSize: "12px",
    fontWeight: 700,
    border: "1px solid #445366",
    backgroundColor: buttonBackgroundColor || "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      color: "#aa1f3e",
      border: "1px solid #aa1f3e",
    },
  };

  return (
    <Container sx={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 0" }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "500px",
              height: "450px",
              bgcolor: "#ddd",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              mx: "auto",
            }}
          >
            <img
              src={imagePreview || "/image/imsi.jpg"}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>

          {/* 관리자 모드에서 이미지 업로드 UI */}
          {isAdmin && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginBottom: "10px" }}
              />
              {imageFile && (
                <Button variant="contained" onClick={handleSaveImage} sx={{ ml: 2 }}>
                  이미지 저장
                </Button>
              )}
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "20px" }}>
              {title || product.name}
            </Typography>
            <Box>
              <IconButton
                sx={{ padding: 0, margin: "0 4px", border: "none", "&:hover": { backgroundColor: "#e0e0e0" } }}
                onClick={() => inquiryLink && navigate(inquiryLink)}
              >
                <ChatBubbleOutline />
              </IconButton>
              <IconButton
                sx={{ padding: 0, margin: "0 4px", border: "none", "&:hover": { backgroundColor: "#e0e0e0" } }}
                onClick={() => console.log("찜하기 기능 추가 예정")}
              >
                <FavoriteBorder />
              </IconButton>
              <IconButton
                sx={{ padding: 0, margin: "0 4px", border: "none", "&:hover": { backgroundColor: "#e0e0e0" } }}
                onClick={handleAddToCart}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ my: 0.25 }} />

          <Box sx={{ textAlign: "left", mt: 2, mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              상품 설명
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "12px", mt: 1 }}>
              {description || "여기서 상품 설명을 짧게 추가할 수 있습니다."}
            </Typography>
          </Box>

          <Divider sx={{ my: 0.75 }} />

          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#027af2" }}>
              {product.price.toLocaleString()}원
            </Typography>
          </Box>

          <Divider sx={{ my: 0.75 }} />

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ fontSize: "14px", color: "black" }}>
                가격
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "16px", color: "black" }}>
                {product.price.toLocaleString()}원
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ fontSize: "14px", color: "black" }}>
                수량
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <IconButton onClick={handleDecrement} sx={{ padding: "5px" }}>
                  <Typography variant="h6">-</Typography>
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={handleQuantityChange}
                  type="number"
                  variant="outlined"
                  sx={{
                    width: "60px",
                    "& input": {
                      fontSize: "14px",
                      padding: "8px 0",
                      textAlign: "center",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "36px",
                    },
                  }}
                  inputProps={{ min: 1 }}
                />
                <IconButton onClick={handleIncrement} sx={{ padding: "5px" }}>
                  <Typography variant="h6">+</Typography>
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ fontSize: "14px", color: "black" }}>
                합계
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "16px", color: "black" }}>
                {(product.price * quantity).toLocaleString()}원
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 0.75 }} />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
            <Button
              variant="text"
              sx={buttonStyle}
              onClick={() => buyLink && navigate(buyLink)}
            >
              구매하기
            </Button>
            <Button
              variant="text"
              sx={buttonStyle}
              onClick={() => cartLink ? navigate(cartLink) : handleAddToCart()}
            >
              장바구니
            </Button>
            <Button
              variant="text"
              sx={buttonStyle}
              onClick={() => inquiryLink && navigate(inquiryLink)}
            >
              대여문의
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>장바구니에 상품이 담겼습니다.</DialogTitle>
        <DialogContent>장바구니로 이동하시겠습니까?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={buttonStyle}>
            계속 쇼핑하기
          </Button>
          <Button onClick={() => cartLink && navigate(cartLink)} sx={buttonStyle}>
            장바구니 이동
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}