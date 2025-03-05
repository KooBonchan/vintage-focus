import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

function FilterBar() {
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
      <FormControl variant="filled" sx={{ minWidth: 100 }} size="small">
        <InputLabel>제조사</InputLabel> {/* 라벨 스타일 제거 */}
        <Select
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          sx={{
            border: "1px solid #bdbdbd",
            borderRadius: "15px",
            fontWeight: 600,
            backgroundColor: "transparent",
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="sony">Sony</MenuItem>
          <MenuItem value="canon">Canon</MenuItem>
          <MenuItem value="nikon">Nikon</MenuItem>
        </Select>
      </FormControl>

      {/* 년식 선택 */}
      <FormControl variant="filled" sx={{ minWidth: 100 }} size="small">
        <InputLabel>년식</InputLabel> {/* 라벨 스타일 제거 */}
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
      <FormControl variant="filled" sx={{ minWidth: 100 }} size="small">
        <InputLabel>가격</InputLabel> {/* 라벨 스타일 제거 */}
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
      <FormControl variant="filled" sx={{ minWidth: 100 }} size="small">
        <InputLabel>필터</InputLabel> {/* 라벨 스타일 제거 */}
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