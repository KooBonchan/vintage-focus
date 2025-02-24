import { AppBar, Toolbar, Typography, InputBase, IconButton, Box } from "@mui/material";
import { Search, AccountCircle } from "@mui/icons-material";

function Navbar() {
  return (
    <AppBar position="static" sx={{ background: "#fff", color: "#000", boxShadow: 0, borderBottom: "1px solid #ddd" }}>
      <Toolbar sx={{ flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
        
        {/* 🔹 검색창 (최상단 중앙 정렬) */}
        <Box sx={{ display: "flex", alignItems: "center", border: "1px solid gray", borderRadius: "5px", px: 2, py: 0.5, width: "40%" }}>
          <InputBase placeholder="Search…" sx={{ flex: 1 }} />
          <IconButton>
            <Search />
          </IconButton>
        </Box>

        {/* 🔹 로고 & 메뉴바 */}
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", px: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Logo
          </Typography>
          
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography>홈</Typography>
            <Typography>상품</Typography>
            <Typography>문의</Typography>
            <Typography>매각</Typography>
          </Box>
          
          <IconButton>
            <AccountCircle />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
