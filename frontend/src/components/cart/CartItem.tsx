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
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={onSelect} />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img src={item.image} alt={item.name} width={60} height={60} />
          <Typography>{item.name}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => { handleQuantityChange(item.id, -1); }}>
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
          <IconButton onClick={() => onQuantityChange(1)} size="small">
            <AddIcon />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>{(item.price * item.quantity).toLocaleString()}원</TableCell>
      <TableCell>{item.shipping.toLocaleString()}원</TableCell>
    </TableRow>
  );
}
