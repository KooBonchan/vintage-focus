import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface FilterProps {
  company?: string;
  condition?: string
  sortBy?: string; //추천정렬
  category: string;
}

function FilterBar({filters, setFilters}:{
  filters: FilterProps,
  setFilters: (state: FilterProps) => void
}) {
  
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


{/* 렌즈, 카메라, 디카 */}
  <FormControl variant="filled" sx={{ minWidth: 100 }} size="small">
    <InputLabel>상품</InputLabel>
    <Select
      value={filters.category}
      onChange={(e) => { setFilters({ ...filters, category: e.target.value });
      navigate(`/product?category=${e.target.value}`);  }}
      sx={{
        border: "1px solid #bdbdbd",
        borderRadius: "15px",
        fontWeight: 600,
        backgroundColor: "transparent",
      }}
    >
      <MenuItem value="all">All</MenuItem>
      <MenuItem value="lens">렌즈</MenuItem>
      <MenuItem value="camera">카메라</MenuItem>
      <MenuItem value="dicam">디카</MenuItem>
    </Select>
  </FormControl>


      {/* 제조사 선택 */}
      <FormControl variant="filled" sx={{ minWidth: 100 }} size="small">
        <InputLabel>제조사</InputLabel> {/* 라벨 스타일 제거 */}
        <Select
          value={filters.company}
          onChange={(e) => { setFilters({...filters, company:e.target.value}); }}
          sx={{
            border: "1px solid #bdbdbd",
            borderRadius: "15px",
            fontWeight: 600,
            backgroundColor: "transparent",
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="니콘">Nikon</MenuItem>
          <MenuItem value="소니">Sony</MenuItem>
          <MenuItem value="라이카">Leica</MenuItem>
          <MenuItem value="후지필름">Fujifilm</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ minWidth: 100 }} size="small">
        <InputLabel>상품 상태</InputLabel> {/* 라벨 스타일 제거 */}
        <Select
          value={filters.condition}
          onChange={(e) => { setFilters({...filters, condition:e.target.value}); }}
          sx={{
            border: "1px solid #bdbdbd",
            borderRadius: "15px",
            fontWeight: 600,
            backgroundColor: "transparent",
          }}
        >
          <MenuItem value="all">전체</MenuItem>
        </Select>
      </FormControl>

      {/* 정렬 기준 */}
      <FormControl variant="filled" sx={{ minWidth: 100 }} size="small">
        <InputLabel>정렬</InputLabel> {/* 라벨 스타일 제거 */}
        <Select
          value={filters.sortBy}
          onChange={(e) => { setFilters({...filters, sortBy:e.target.value}); }}
          sx={{
            border: "1px solid #bdbdbd",
            borderRadius: "15px",
            fontWeight: 600,
            backgroundColor: "transparent",
          }}
        >
          <MenuItem value="base">--</MenuItem>
          <MenuItem value="lowPrice">낮은 가격순</MenuItem>
          <MenuItem value="highPrice">높은 가격순</MenuItem>
          <MenuItem value="recommended">추천순</MenuItem>
          <MenuItem value="popular">인기순</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterBar;