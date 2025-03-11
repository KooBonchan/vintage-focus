import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled 컴포넌트 정의
const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Align elements vertically (logo on top, text below)
  gap: theme.spacing(2), // Add space between logo and text
  alignItems: "flex-start", // Align items to the left (start of the container)
  justifyContent: "center", // Center vertically within the container
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "60%", // 화면 크기가 sm 이상일 경우 너비를 60%로 설정
  },
  marginLeft: theme.spacing(2), // Adds margin to the left for better positioning
  [theme.breakpoints.down("sm")]: {
    alignItems: "center", // Center horizontally on small screens
    justifyContent: "center", // Center vertically on small screens
  },
}));

const Logo = styled('img')(({ theme }) => ({
  width: "auto",
  maxWidth: 200,
  marginBottom: 0, // Remove bottom margin since items are now aligned vertically
}));

const FooterLogo = () => {
  const theme = useTheme();
  const logoSrc = theme.palette.mode === "dark" ? "/image/logo-white.png" : "/image/logo.png";

  return (
    <Wrapper>
      <Logo src={logoSrc} alt="Vintage Focus Logo" />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          ml: { xs: 0, sm: 6 }, // Left margin responsive: 0 on small screens, 6 on larger screens
          textAlign: { xs: "center", sm: "left" }, // Center align text on small screens, left align on larger screens
        }}
      >
        "세월을 품은 카메라, <br /> 새로운 순간을 담다."
      </Typography>
    </Wrapper>
  );
};

export default FooterLogo;
