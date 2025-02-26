import { NavLink } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

export default function Logo() {
  const theme = useTheme();
  const logoImage =
    theme.palette.mode === "dark" ? "/image/minilogo-d.png" : "/image/minilogo.png";

  return (
    <NavLink to="/">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logoImage}  // 테마에 따라 이미지 변경
          alt="Logo"
          style={{ height: 20, width: "auto", marginRight: 8 }}
        />
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          {/* LOGO */}
        </Typography>
      </div>
    </NavLink>
  );
}
