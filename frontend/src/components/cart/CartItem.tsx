import { TableRow, TableCell, Checkbox, Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CartItemProps {
  item: { id: number; image: string; name: string; price: number; quantity: number; shipping: number };
  selected: boolean;
  onSelect: () => void;
  onQuantityChange: (amount: number) => void;
}

export default function CartItem({ item, selected, onSelect, onQuantityChange }: CartItemProps) {
  return (
    <TableRow sx={{ height: 120, borderBottom: "1px solid #ddd" }}> {/* ✅ 구분선 추가 */}
      {/* 체크박스 */}
      <TableCell padding="checkbox" align="center" sx={{ width: "5%" }}>
        <Checkbox checked={selected} onChange={onSelect} color="primary" sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }} />
      </TableCell>

      {/* 상품 옵션 정보 */}
      <TableCell sx={{ padding: "16px 24px", width: "45%" }}> {/* ✅ 너비 조정 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* 이미지 */}
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: 2,
              backgroundColor: "#f0f0f0", // ✅ 회색 배경 적용
              padding: "8px",
            }}
          />
          {/* 상품 이름 */}
          <Typography variant="body1" sx={{ fontSize: 16, fontWeight: 500, color: "#333" }}>
            {item.name}
          </Typography>
        </Box>
      </TableCell>

      {/* 수량 조절 */}
      <TableCell align="center" sx={{ width: "20%" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          <IconButton
            onClick={() => { onQuantityChange(-1); }}
            size="small"
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: 36,
              height: 36,
              backgroundColor: "#fff",
              ":hover": { backgroundColor: "#f1f1f1" },
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ mx: 1.5, fontSize: 18, fontWeight: 600 }}>{item.quantity}</Typography>
          <IconButton
            onClick={() => { onQuantityChange(1); }}
            size="small"
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: 36,
              height: 36,
              backgroundColor: "#fff",
              ":hover": { backgroundColor: "#f1f1f1" },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>

      {/* 상품 금액 */}
      <TableCell align="center" sx={{ width: "15%" }}>
        <Typography variant="body1" sx={{ fontSize: 16, fontWeight: 600, color: "#222" }}>
          {(item.price * item.quantity).toLocaleString()}원
        </Typography>
      </TableCell>

      {/* 배송비 */}
      <TableCell align="center" sx={{ width: "15%" }}>
        <Typography variant="body1" sx={{ fontSize: 16, fontWeight: 500, color: "#666" }}>
          {item.shipping.toLocaleString()}원
        </Typography>
      </TableCell>
    </TableRow>
  );
}
