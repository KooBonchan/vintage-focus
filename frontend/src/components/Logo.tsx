import { NavLink } from "react-router";
import { Typography, useTheme } from "@mui/material";



export default function Logo(){
  const theme = useTheme();
  return (
  <NavLink to="/">
    <Typography
      variant="h6"
      noWrap
      sx={{
        mr: 2,
        color: theme.palette.text.primary,
        textDecoration: 'none',
      }}
    >
      LOGO
    </Typography>
  </NavLink>
)};
