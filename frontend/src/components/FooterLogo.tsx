import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled 컴포넌트 정의
const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "60%",
  },
}));

const Logo = styled('img')(({ theme }) => ({
  width: "auto",
  maxWidth: 200,
  marginBottom: theme.spacing(2),
}));

const FooterLogo = () => {
  const theme = useTheme();
  const logoSrc = theme.palette.mode === "dark" ? "/image/logo-white.png" : "/image/logo.png";

  return (
    <Wrapper>
      <Logo src={logoSrc} alt="Vintage Focus Logo" />
      <Typography variant="body2" color="text.secondary">
       "세월을 품은 카메라,새로운 순간을 담다."
      </Typography>
    </Wrapper>
  );
};

export default FooterLogo;