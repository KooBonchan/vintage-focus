import { Box, Typography, Divider, IconButton, Button, Grid } from "@mui/material";
import { ChatBubbleOutline, FavoriteBorder, Add } from "@mui/icons-material";

export function ProductInfo() {
  return (
    <Grid container spacing={4} alignItems="center">
      {/* 상품 이미지 */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            width: "500px",  // 너비 고정
            height: "450px", // 높이 고정
            bgcolor: "#ddd",
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {/* 이미지가 들어갈 자리 */}
        </Box>
      </Grid>

      {/* 상품 정보 */}
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            어쩌구 저쩌구
          </Typography>

          {/* 아이콘 버튼들 */}
          <Box>
            <IconButton
              sx={{
                padding: 0,
                margin: "0 4px",
                border: "none",
                "&:hover": {
                  backgroundColor: "#e0e0e0",  // Hover 배경색
                }
              }}
            >
              <ChatBubbleOutline />
            </IconButton>
            <IconButton
              sx={{
                padding: 0,
                margin: "0 4px",
                border: "none",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                }
              }}
            >
              <FavoriteBorder />
            </IconButton>
            <IconButton
              sx={{
                padding: 0,
                margin: "0 4px",
                border: "none",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                }
              }}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* 가격 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Typography variant="body1">가격</Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#027af2" }}>
            1,000,000원
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 추가 정보 */}
        <Box sx={{ textAlign: "left", mt: 5, mb: 5 }}>
          <Typography variant="h6" fontWeight="bold">
            Title
          </Typography>
          <Typography sx={{ color: "gray", fontSize: "14px", mt: 1 }}>
            내용을 짧게 <br />
            적어주세요 <br />
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 상품 사양 테이블 */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">상품명</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">상품 수</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">가격</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* 버튼 영역 */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
          <Button variant="text" sx={{ borderRadius: 2, bgcolor: "#ccc", color: "black", px: 4 }}>
            구매하기
          </Button>
          <Button variant="text" sx={{ borderRadius: 2, bgcolor: "#bbb", color: "black", px: 4 }}>
            장바구니
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
