import { Container, styled } from "@mui/material";
import { Outlet } from "react-router";

const StyledAuthContainer = styled(Container)({
  maxWidth: 600,
  marginTop: 100,
})


export function AuthLayout() {
  return (
    <StyledAuthContainer>
      <Outlet />
    </StyledAuthContainer>
  );
}