import { Grid, Box, Typography, Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import NewItemGallery from "./NewItemGallery";
import ThemedContainer from "../../components/ThemedContainer";
import CategoryIconBar from "./CategoryIconBar";
import WeeklyBestGallery from "./WeeklyBestGallery";

// StyledImageBox 정의
const StyledImageBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  borderRadius: theme.shape.borderRadius,
  paddingTop: theme.spacing(8),
  border: "1px solid",
  borderColor: theme.palette.grey[200],
  backgroundImage:
    theme.palette.mode === "dark"
      ? "url(/image/main2.jpg)" // 다크 모드일 때 이미지
      : "url(/image/main.jpg)", // 기본 모드일 때 이미지
  backgroundSize: "cover",
  backgroundPosition: "center",
  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.spacing(10),
    height: 400,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: theme.palette.grey[700],
  }),
}));

export function Home() {
  return (
    <ThemedContainer
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <StyledImageBox id="image" />
      <CategoryIconBar />
      <NewItemGallery />
      <WeeklyBestGallery />
    </ThemedContainer>
  );
}

