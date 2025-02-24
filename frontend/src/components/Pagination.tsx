import { Pagination } from "@mui/material";

// Props 타입 정의
interface CustomPaginationProps {
  page: number;
  setPage: (value: number) => void;
}

function CustomPagination({ page, setPage }: CustomPaginationProps) {
  return (
    <Pagination
      count={5}
      page={page}
      onChange={(event, value) => setPage(value)}
      sx={{ display: "flex", justifyContent: "center", mt: 3 }}
    />
  );
}

export default CustomPagination;
