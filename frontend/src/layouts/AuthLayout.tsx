import { ReactNode } from "react";

export function AuthLayout(
  {children}:
  {children:ReactNode;}) {
  return (
    <>
    <Header></Header>
    {children}
    <Footer></Footer>
    </>
  );
}

function Header(){
  return (
  <>
  </>
  );
}

function Footer(){
  return (
  <>
  </>
  );
}