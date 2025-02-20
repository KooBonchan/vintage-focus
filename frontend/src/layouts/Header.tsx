import { AppBar, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router";

type ReactiveDisplay = { xs: 'block' | 'flex' | 'none', md: 'block' | 'flex' | 'none' };
type RouteMetadata = {
  name: string,
  route: string,
}
const navRoutes: RouteMetadata[] = [
  { name: '홈', route: '/', },
  { name: '상품목록', route: '/product', },
  { name: '회사소개', route: '/about', },
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Logo = ({ display }: { display: ReactiveDisplay }) => (
  <NavLink to="/">
    <Typography
      variant="h6"
      noWrap
      sx={{
        mr: 2,
        display: display,
        fontWeight: 700,
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      LOGO
    </Typography>
  </NavLink>
)

export function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position='static'>    </AppBar>
  );
}

