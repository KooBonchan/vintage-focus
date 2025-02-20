import { NavLink } from "react-router";
import { Typography } from "@mui/material";

export default function Logo(){
  return (
  <NavLink to="/">
    <Typography
      variant="h6"
      noWrap
      sx={{
        mr: 2,
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      LOGO
    </Typography>
  </NavLink>
)};
