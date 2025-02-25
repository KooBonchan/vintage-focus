import { Box, Typography, Grid, useTheme } from "@mui/material"; // Add useTheme import

const NewItemGallery = () => {
  const theme = useTheme(); // Get the theme object to access dark mode or light mode

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "none",
        padding: 4,
        textAlign: "center",
        borderRadius: 2,
        marginTop: 10,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.mode === 'dark' ? 'white' : 'black', // Dynamically change the color
          fontWeight: 'bold',
        }}
      >
        New Item
      </Typography>
      {/* New Item 박스 두 개 가로 배치 */}
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              width: "100%",
              height: 300,
              backgroundImage: "url(/image/sample/sample.jpg)", // 이미지를 여기에 삽입
              backgroundSize: "cover", // 이미지 크기를 맞춤
              backgroundPosition: "center", // 이미지 위치 중앙
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              position: "relative", // 자식 요소의 위치 설정을 위해 필요
              "&:hover": {
                // 마우스 오버 시
                "& .image": {
                  filter: "brightness(0.3)", // 이미지 어두워지게 설정
                  transition: "filter 0.3s ease-in-out", // 밝기 변경 부드럽게 전환
                },
                "& .text": {
                  opacity: 1, // 텍스트를 보이게 함
                  color: 'white', // 글씨 색상 검정
                  transition: "opacity 0.3s ease-in-out, color 0.3s ease-in-out", // 부드러운 전환
                }
              }
            }}
          >
            <Box
              className="image"
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage: "url(/image/sample/sample.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                transition: "filter 0.3s ease-in-out", // 밝기 변경 부드럽게 전환
              }}
            />
            <Typography
              className="text"
              variant="h4"
              sx={{
                position: "relative",
                color: 'transparent', // 기본적으로 텍스트는 안 보이게 설정
                fontWeight: 'lighter',
                opacity: 0, // 기본적으로 텍스트는 투명하게 설정
                transition: "opacity 0.3s ease-in-out, color 0.3s ease-in-out", // 부드러운 전환
              }}
            >
              sample
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              width: "100%",
              height: 300,
              backgroundImage: "url(/image/sample/sample2.jpg)", // 두 번째 이미지를 여기에 삽입
              backgroundSize: "cover", // 이미지 크기를 맞춤
              backgroundPosition: "center", // 이미지 위치 중앙
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              position: "relative", // 자식 요소의 위치 설정을 위해 필요
              "&:hover": {
                // 마우스 오버 시
                "& .image": {
                  filter: "brightness(0.3)", // 이미지 어두워지게 설정
                  transition: "filter 0.3s ease-in-out", // 밝기 변경 부드럽게 전환
                },
                "& .text": {
                  opacity: 1, // 텍스트를 보이게 함
                  color: 'white', // 글씨 색상 검정
                  transition: "opacity 0.3s ease-in-out, color 0.3s ease-in-out", // 부드러운 전환
                }
              }
            }}
          >
            <Box
              className="image"
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage: "url(/image/sample/sample2.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                transition: "filter 0.3s ease-in-out", // 밝기 변경 부드럽게 전환
              }}
            />
            <Typography
              className="text"
              variant="h4"
              sx={{
                position: "relative",
                color: 'transparent', // 기본적으로 텍스트는 안 보이게 설정
                fontWeight: 'lighter',
                opacity: 0, // 기본적으로 텍스트는 투명하게 설정
                transition: "opacity 0.3s ease-in-out, color 0.3s ease-in-out", // 부드러운 전환
              }}
            >
              sample2
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewItemGallery;
