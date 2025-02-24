import { styled } from "@mui/material";
import ThemedContainer from "../components/ThemedContainer";

const StyledImageBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  borderRadius: theme.shape.borderRadius,
  paddingTop: theme.spacing(8),
  // outline: '6px solid',
  // outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  // boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: "url(/image/main.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",

  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(10),
    height: 400,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: "url(/image/main.jpg)",
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: theme.palette.grey[700],
  }),
}));

export function Home() {
  return (
    <ThemedContainer sx={{ height:'80vh'}}>
      <StyledImageBox id="image" />
    </ThemedContainer>
  );
}
