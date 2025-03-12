import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 3,
        textAlign: "center",
        color: "#ffffff", // 테마에 맞춘 텍스트 색상
      }}
    >
      <Typography variant="h4" gutterBottom>
        리뷰 페이지
      </Typography>
      <Typography variant="body1" paragraph>
        이곳은 사용자 리뷰를 확인하고 작성할 수 있는 페이지입니다. 현재는 기본적인 내용만 표시됩니다.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        홈으로 돌아가기
      </Button>
    </Box>
  );
};

export default Reviews;