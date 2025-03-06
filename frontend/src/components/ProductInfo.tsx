import { Box, Typography, Divider, IconButton, Button, Grid } from "@mui/material";
import { ChatBubbleOutline, FavoriteBorder, Add } from "@mui/icons-material";

export function ProductInfo() {
  return (
    <Box
      sx={{
        width: "100%",          // 화면 전체에 맞게 확장
        maxWidth: "1200px",     // 최대 폭을 1200px로 제한
        margin: "0 auto",       // 중앙 정렬
        padding: "0 16px",      // 양옆에 패딩 추가
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* 상품 이미지 */}
        <Grid item xs={12} md={6}>
          <div
            style={{
              width: "100%",  // 화면 크기에 맞춰서 반응형으로 설정
              maxWidth: "500px",  // 최대 500px로 제한
              height: "500px", // 세로 크기 고정
              backgroundColor: "#ddd",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* 이미지가 들어갈 자리 */}
            <img
              src="https://via.placeholder.com/400x400" // 테스트용 이미지 URL (필요에 맞게 수정)
              alt="상품 이미지"
              style={{
                width: "100%",  // 가로 크기를 100%로 설정하여 부모 div에 맞게 크기 조정
                height: "100%", // 세로 크기를 고정하여 이미지 비율 유지
                borderRadius: "8px",
              }}
            />
          </div>
        </Grid>

        {/* 상품 정보 */}
        <Grid item xs={12} md={6}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold">
              어쩌구 저쩌구
            </Typography>

            {/* 아이콘 버튼들 */}
            <div>
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
            </div>
          </div>

          <Divider sx={{ my: 1 }} />

          {/* 가격 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
            <Typography variant="body1">가격</Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#027af2" }}>
              1,000,000원
            </Typography>
          </div>

          <Divider sx={{ my: 2 }} />

          {/* 추가 정보 */}
          <div style={{ textAlign: "left", marginTop: "40px", marginBottom: "40px" }}>
            <Typography variant="h6" fontWeight="bold">
              Title
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "14px", marginTop: "8px" }}>
              내용을 짧게 <br />
              적어주세요 <br />
            </Typography>
          </div>

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
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "32px" }}>
            <Button
              variant="text"
              sx={{
                borderRadius: "3em", // Rounded corners
                bgcolor: "#ffffff",
                color: "#445366",
                padding: "5px 16px", // Small size
                fontSize: "12px",
                fontWeight: 700,
                border: "1px solid #445366", // Border for small size
                "&:hover": {
                  backgroundColor: "white",
                  color: "#aa1f3e",
                  border: "1px solid #aa1f3e",
                },
              }}
            >
              구매하기
            </Button>
            <Button
              variant="text"
              sx={{
                borderRadius: "3em", // Rounded corners
                bgcolor: "#fffff",
                color: "#445366",
                padding: "5px 16px", // Small size
                fontSize: "12px",
                fontWeight: 700,
                border: "1px solid #445366", // Border for small size
                "&:hover": {
                  backgroundColor: "white",
                  color: "#aa1f3e",
                  border: "1px solid #aa1f3e",
                },
              }}
            >
              장바구니
            </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
