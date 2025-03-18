import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import FilterBar from "./FilterBar";

function Navbar(props) {
  return (
    <AppBar position="static" sx={{ background: "#fff", color: "#000", boxShadow: 0, borderBottom: "1px solid #ddd" }}>
      <Toolbar sx={{ flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
        
        {/* 🔹 로고 & 메뉴바 */}
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", px: 3 }}>
          <Typography>
          </Typography>
        </Box>
        <FilterBar {...props} />

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
