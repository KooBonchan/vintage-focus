import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled 컴포넌트 정의
const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row", // Align elements horizontally
  gap: theme.spacing(2), // Add space between logo and text
  alignItems: "center", // Vertically center align
  justifyContent: "center", // Horizontally center align
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "60%", // 화면 크기가 sm 이상일 경우 너비를 60%로 설정
  },
}));

const Logo = styled('img')(({ theme }) => ({
  width: "auto",
  maxWidth: 200,
  marginBottom: 0, // Remove bottom margin since items are now aligned horizontally
}));

const FooterLogo = () => {
  const theme = useTheme();
  const logoSrc = theme.palette.mode === "dark" ? "/image/logo-white.png" : "/image/logo.png";

  return (
    <Wrapper>
      <Logo src={logoSrc} alt="Vintage Focus Logo" />
      <Typography variant="body2" color="text.secondary">
        "세월을 품은 카메라, 새로운 순간을 담다."
      </Typography>
    </Wrapper>
  );
};

export default FooterLogo;
