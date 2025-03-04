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
        borderRadius: "25px",
        width: "fit-content",
        mx: "auto", 
      }}
    >
      
      {/* 제조사 선택 */}
      <FormControl sx={{ minWidth: 100 }} size="small">
        <InputLabel sx={{ opacity: manufacturer ? 0 : 1 }}>제조사</InputLabel>
        <Select
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          sx={{
            border: "1px solid #bdbdbd", // ✅ 테두리 추가
            borderRadius: "15px", // ✅ 둥글게
            fontWeight: 600, // ✅ 글자 굵게
            backgroundColor: "transparent", // ✅ 배경 없앰
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="sony">Sony</MenuItem>
          <MenuItem value="canon">Canon</MenuItem>
          <MenuItem value="nikon">Nikon</MenuItem>
        </Select>
      </FormControl>

      {/* 년식 선택 */}
      <FormControl sx={{ minWidth: 100 }} size="small">
        <InputLabel sx={{ opacity: year ? 0 : 1 }}>년식</InputLabel>
        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{
            border: "1px solid #bdbdbd",
            borderRadius: "15px",
            fontWeight: 600,
            backgroundColor: "transparent",
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={2024 - i} value={2024 - i}>
              {2024 - i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 가격 필터 */}
      <FormControl sx={{ minWidth: 100 }} size="small">
        <InputLabel sx={{ opacity: price ? 0 : 1 }}>가격</InputLabel>
        <Select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{
            border: "1px solid #bdbdbd",
            borderRadius: "15px",
            fontWeight: 600,
            backgroundColor: "transparent",
          }}
        >
          <MenuItem value="low">낮은 가격순</MenuItem>
          <MenuItem value="high">높은 가격순</MenuItem>
        </Select>
      </FormControl>

      {/* 정렬 기준 */}
      <FormControl sx={{ minWidth: 100 }} size="small">
        <InputLabel sx={{ opacity: sortBy ? 0 : 1 }}>필터</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{
            border: "1px solid #bdbdbd",
            borderRadius: "15px",
            fontWeight: 600,
            backgroundColor: "transparent",
          }}
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
