import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Tooltip, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';  // 수정: react-router-dom 사용
import ColorModeIconDropdown from '../components/ColorModeIconDropdown';
import Logo from '../components/Logo';
import useAuthStore from '@/stores/authStore';
import { LogoutOutlined } from '@mui/icons-material';


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  borderColor: theme.palette.divider,
  backgroundColor: `rgba(${theme.palette.background.default} / 0.4)`,
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

type RouteMetadata = {
  name: string,
  route: string,
};

const routes: RouteMetadata[] = [
  { name: "홈", route: "/" },
  { name: "상품", route: "/product" },
  { name: "공지사항", route: "/notice" },
  { name: "매각문의", route: "/sell-inquiry" },
  { name: "구매문의", route: "/buy-inquiry" },
  { name: "대여문의", route: "/rental-inquiry" },
  { name: "구매후기", route: "/reviews" },
];

export default function HeaderBar() {
  const {user, clearAuth} = useAuthStore();

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>

          {/* md size */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Logo />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {routes.map(({ name, route }) => (
                <NavLink to={route} key={name}>
                  <Button variant="text" color="info" size="small">
                    {name}
                  </Button>
                </NavLink>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <IconButton
              onClick={() => navigate("/admin/dashboard")}
              disableRipple
              size="small"
              aria-controls={open ? 'color-scheme-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              ⚙️
            </IconButton>
            {user?
            ( <>
              <Avatar
                  alt='profile image'
                  src={user.profileImage}
                  sizes='25px'
                >
              </Avatar>
              <IconButton aria-label="logout" onClick={clearAuth}>
                <LogoutOutlined />
              </IconButton>
              </>
              
            )
            :
            ( <NavLink to="/signin">
                <Button color="primary" variant="text" size="small">
                  Sign in
                </Button>
              </NavLink>
            )
            }
            <ColorModeIconDropdown />
          </Box>
          {/* md size end */}

          {/* xs size */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {routes.map(({ name, route }) => (
                  <NavLink to={route} key={name}>
                    <MenuItem>{name}</MenuItem>
                  </NavLink>
                ))}
                
                <Divider sx={{ my: 3 }} />
                {
                  user?
                  (
                    <Box display='flex' justifyContent='space-between' >
                      <Box sx={{display:"flex", alignItems:'center',gap:1}}>
                        <Avatar
                          alt='profile image'
                          src={user.profileImage}
                          sizes='25px'
                        >
                        </Avatar>
                        <Typography>
                          {user.username}
                        </Typography>
                      </Box>
                      <Button variant="text" startIcon={<LogoutOutlined />} onClick={clearAuth}>
                        로그아웃
                      </Button>
                    </Box>
                  )
                  :
                  (
                    <NavLink to="/signin">
                      <MenuItem>
                        <Button color="primary" variant="outlined" fullWidth>
                          Sign in
                        </Button>
                      </MenuItem>
                    </NavLink>  
                  )
                }
                
              </Box>
            </Drawer>
          </Box>
          {/* xs size end */}
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}