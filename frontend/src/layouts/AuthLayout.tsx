import { Container, styled } from "@mui/material";
import { Outlet } from "react-router";

const StyledAuthContainer = styled(Container)({
  maxWidth: 600,
})


export function AuthLayout() {
  return (
    <StyledAuthContainer>
      <Outlet />
    </StyledAuthContainer>
  );
}