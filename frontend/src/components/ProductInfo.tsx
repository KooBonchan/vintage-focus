import React, { useState } from 'react';
import { Box, Typography, Divider, IconButton, Button, Grid, TextField } from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material"; // 문의 아이콘만 남김

export function ProductInfo({
  title = '어쩌구 저쩌구',
  price = '1,000,000원',
  description = '내용을 짧게 적어주세요',
  buttonBackgroundColor,
  onBuyClick,
  onCartClick,
  buyLink = '#', // 클릭 시 이동할 링크
  cartLink = '#', // 클릭 시 이동할 링크
  inquiryLink = '#', // 문의하기 링크
  imageSrc = "/image/imsi.jpg", // 이미지 소스를 prop으로 받음
}: {
  title: string;
  price: string;
  description: string;
  buttonBackgroundColor?: string;
  onBuyClick: () => void;
  onCartClick: () => void;
  buyLink: string; // 구매 링크
  cartLink: string; // 장바구니 링크
  inquiryLink: string; // 문의 링크
  imageSrc: string; // 이미지 경로
}) {
  const [quantity, setQuantity] = useState(1); // 상품 수량 상태 관리

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const buttonStyle = {
    borderRadius: "3em",
    color: "#445366",
    padding: "5px 16px",
    fontSize: "12px",
    fontWeight: 700,
    border: "1px solid #445366",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      color: "#aa1f3e",
      border: "1px solid #aa1f3e",
    },
  };

  const coloredButtonStyle = {
    borderRadius: "3em",
    color: "#ffffff",
    padding: "5px 16px",
    fontSize: "12px",
    fontWeight: 700,
    border: "1px solid #445366",
    backgroundColor: "#445366",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      color: "#aa1f3e",
      border: "1px solid #aa1f3e"
    },
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 8px" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* 상품 이미지 */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            width: "100%", maxWidth: "400px", height: "400px", backgroundColor: "#ddd", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            <img src={imageSrc} alt="상품 이미지" style={{ width: "100%", height: "100%", borderRadius: "8px" }} />
          </div>
        </Grid>

        {/* 상품 정보 */}
        <Grid item xs={12} md={6}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "20px" }}>
              {title}
            </Typography>

            {/* 문의 아이콘 버튼 */}
            <div>
              <IconButton sx={{ padding: 0, margin: "0 2px", border: "none", "&:hover": { backgroundColor: "#e0e0e0" } }} onClick={() => window.location.href = inquiryLink}>
                <ChatBubbleOutline />
              </IconButton>
            </div>
          </div>

          <Divider sx={{ my: 0.25 }} />

          {/* 추가 정보 */}
          <div style={{ textAlign: "left", marginTop: "8px", marginBottom: "8px" }}>
            <Typography variant="h6" fontWeight="bold">
              Title
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "12px", marginTop: "4px" }}>
              {description}
            </Typography>
          </div>

          <Divider sx={{ my: 0.75 }} />

          {/* 상단 가격 표시 */}
          <div style={{ marginTop: "16px", textAlign: "left" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#027af2" }}>
              {price}
            </Typography>
          </div>

          <Divider sx={{ my: 0.75 }} />

          {/* 하단 가격, 수량, 합계 */}
          <Grid container spacing={2}>
            {/* 가격 */}
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ fontSize: "14px", color: "black" }}>
                가격
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "16px", color: "black" }}>
                {price}
              </Typography>
            </Grid>

            {/* 수량 */}
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ fontSize: "14px", color: "black" }}>
                수량
              </Typography>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <IconButton onClick={handleDecrement} sx={{ padding: "5px" }}>
                  <Typography variant="h6">-</Typography>
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  type="number"
                  variant="outlined"
                  sx={{
                    width: "50px", height: "30px", textAlign: "center", "& input": { fontSize: "14px", padding: "4px 0", textAlign: "center" },
                    "& .MuiOutlinedInput-root": { padding: "0", height: "30px", display: "flex", justifyContent: "center", alignItems: "center" }
                  }}
                  inputProps={{ min: 1 }}
                />
                <IconButton onClick={handleIncrement} sx={{ padding: "5px" }}>
                  <Typography variant="h6">+</Typography>
                </IconButton>
              </div>
            </Grid>

            {/* 합계 */}
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ fontSize: "14px", color: "black" }}>
                합계
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "16px", color: "black" }}>
                {(parseInt(price.replace(/,/g, '')) * quantity).toLocaleString()}원
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 0.75 }} />

          {/* 버튼 영역 */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "16px" }}>
            <Button 
              variant="text" 
              sx={buttonBackgroundColor ? coloredButtonStyle : buttonStyle} 
              onClick={() => window.location.href = buyLink} // 구매하기 버튼 클릭 시 링크 이동
            >
              구매하기
            </Button>
            <Button 
              variant="text" 
              sx={buttonBackgroundColor ? coloredButtonStyle : buttonStyle} 
              onClick={() => window.location.href = cartLink} // 장바구니 버튼 클릭 시 링크 이동
            >
              장바구니
            </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
