import { Outlet } from "react-router";

export function HeaderFooterLayout() {
    return (
      <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
      </>
    );
  }
  
  function Header(){
    return (
    <header>
    헤더
    </header>
    );
  }
  
  function Footer(){
    return (
    <footer>
    푸터
    </footer>
    );
  }
