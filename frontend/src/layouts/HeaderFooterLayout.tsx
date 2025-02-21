import { Outlet } from "react-router";
import { Footer } from "./Footer";
import HeaderBar from "./HeaderBar";
import { styled } from "@mui/material";

const HeadPadding = styled('div')(({theme}) => ({
  height: 100,
  backgroundColor: theme.palette.background.default,
}));

export function HeaderFooterLayout() {
  return (
    <>
      <HeaderBar></HeaderBar>
      <HeadPadding /> 
      <Outlet />
      <Footer></Footer>
    </>
  );
}

