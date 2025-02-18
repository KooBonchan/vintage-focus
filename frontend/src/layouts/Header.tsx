import { Button, styled } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router";

const Nav = styled('nav')({
  padding: '2rem',
  backgroundColor: '#444456',
  color: 'white',
  display: 'flex',
})

export function Header() {
    let navigate = useNavigate();
    
    return (
      <Nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <Button>Home</Button>
        </NavLink>
  
        <Link to="/product">
          <Button>Products</Button>
        </Link>
        <Link to="/about">
          <Button>About Us</Button>
        </Link>
        
      </Nav>
    );
  }
  
  
  