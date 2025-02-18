import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function HeaderFooterLayout() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

