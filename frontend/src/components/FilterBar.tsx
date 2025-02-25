import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

function FilterBar() {
  // 선택된 필터 상태 관리
  const [manufacturer, setManufacturer] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        p: 2,
        bgcolor: "#f8f9fa", // 배경색
        borderRadius: 2, // 둥글게
      }}
    >
      {/* 제조사 선택 */}
      <FormControl sx={{ minWidth: 140 }} size="small">
        <InputLabel>제조사</InputLabel>
        <Select
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="sony">Sony</MenuItem>
          <MenuItem value="canon">Canon</MenuItem>
          <MenuItem value="nikon">Nikon</MenuItem>
        </Select>
      </FormControl>

      {/* 년식 선택 */}
      <FormControl sx={{ minWidth: 140 }} size="small">
        <InputLabel>년식</InputLabel>
        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={2024 - i} value={2024 - i}>
              {2024 - i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 가격 필터 */}
      <FormControl sx={{ minWidth: 140 }} size="small">
        <InputLabel>가격</InputLabel>
        <Select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <MenuItem value="low">낮은 가격순</MenuItem>
          <MenuItem value="high">높은 가격순</MenuItem>
        </Select>
      </FormControl>

      {/* ✅ 정렬 기준 추가 */}
      <FormControl sx={{ minWidth: 140 }} size="small">
        <InputLabel>정렬 기준</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="recommended">추천순</MenuItem>
          <MenuItem value="popular">인기순</MenuItem>
          <MenuItem value="latest">최신순</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterBar;
