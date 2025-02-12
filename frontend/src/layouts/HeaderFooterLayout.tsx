import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router";
import styles from './HeaderFooterLayout.module.css'

export function HeaderFooterLayout() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

function Header() {
  let navigate = useNavigate();

  return (
    <Navbar className={styles.nav}>
      <Container>
        <Navbar.Brand className={styles.logo}>TEST</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={() => { navigate('/') }}
            style={{ color: '#ccc' }}>
            Home
          </Nav.Link>
          <Nav.Link onClick={() => { navigate('/product') }}
            style={{ color: '#ccc' }}>
            Products
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => { navigate('/login') }}
            style={{ color: '#ccc' }}>
            Login
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

function Footer() {
  return (
    <footer>
      푸터
    </footer>
  );
}
