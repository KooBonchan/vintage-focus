import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
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
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const xsDisplay: ReactiveDisplay = { xs: 'block', md: 'none' }
  const mdDisplay: ReactiveDisplay = { xs: 'none', md: 'flex' }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box key="menu-dropdown-icon" sx={{ display: xsDisplay }}>
            <IconButton
              size="large"
              aria-label="menu-appbar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              =
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: xsDisplay }}
            >
              {navRoutes.map(({ name, route }) => (
                <MenuItem key={name} onClick={()=>{navigate(route);handleCloseNavMenu();}}>
                    <Typography sx={{ textAlign: 'center' }}>{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box key="xs-logo" sx={{ flexGrow: 1, display: xsDisplay }}>
            <Logo display={xsDisplay} />
          </Box>


          <Logo key="md-logo" display={mdDisplay} />
          <Box key="md-menu-header" sx={{ flexGrow: 1, display: mdDisplay }}>
            {navRoutes.map(({ name, route }) => (
              <MenuItem key={name} onClick={()=>{navigate(route);handleCloseNavMenu();}}>
                  <Typography sx={{ textAlign: 'center' }}>{name}</Typography>
              </MenuItem>
            ))}
          </Box>

          <Box key="profile-dropdown-icon" sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="profile-dropdown"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

