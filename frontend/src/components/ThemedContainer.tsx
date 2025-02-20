import { Container } from "@mui/material";
import { styled } from "@mui/material";

const ThemedContainer = styled(Container)(({ theme }) => ({
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));
export default ThemedContainer;