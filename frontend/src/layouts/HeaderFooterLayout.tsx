import { Outlet } from "react-router";
import { Footer } from "./Footer";
import HeaderBar from "./HeaderBar";

export function HeaderFooterLayout() {
  return (
    <>
      <HeaderBar></HeaderBar>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

