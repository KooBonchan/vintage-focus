import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Checkbox, Button, Typography, Box, IconButton 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import './Cart.css';  // CSS 파일 임포트

// 장바구니 샘플 데이터
const sampleCartItems = [
  { id: 1, image: "https://placehold.co/100x100", name: "빈티지 카메라", price: 120000, quantity: 1, shipping: 3000 },
  { id: 2, image: "https://placehold.co/100x100", name: "필름 카메라", price: 150000, quantity: 1, shipping: 3000 },
  { id: 3, image: "https://placehold.co/100x100", name: "DSLR 카메라", price: 1200000, quantity: 1, shipping: 5000 },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === cartItems.length ? [] : cartItems.map((item) => item.id));
  };

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalShipping = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.shipping, 0);

  const handleOrder = (type: "selected" | "all") => {
    const orderItems = type === "selected" ? cartItems.filter(item => selectedItems.includes(item.id)) : cartItems;

    if (orderItems.length === 0) {
      alert("주문할 상품을 선택해주세요!");
      return;
    }

    navigate("/order/delivery", { state: { orderItems } });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>장바구니</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedItems.length > 0 && selectedItems.length < cartItems.length}
                  checked={selectedItems.length === cartItems.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>상품 이미지</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>상품/옵션 정보</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>수량</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>상품 금액</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>배송비</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </TableCell>

                <TableCell sx={{ textAlign: "center" }} className="cart-item-name">{item.name}</TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  <Box className="quantity-container">
                    <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>{(item.price * item.quantity).toLocaleString()}원</TableCell>

                <TableCell sx={{ textAlign: "center" }}>{item.shipping.toLocaleString()}원</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="cart-total-box">
        <Typography>
          총 {totalPrice.toLocaleString()}원 + 배송비 {totalShipping.toLocaleString()}원 = 합계{" "}
          {(totalPrice + totalShipping).toLocaleString()}원
        </Typography>
      </Box>

      {/* 버튼을 오른쪽 하단에 배치 */}
      <Box className="cart-buttons-container">
        <Button className="cart-button" variant="text" color="primary" onClick={() => handleOrder("selected")}>
          선택 상품 주문
        </Button>
        <Button className="cart-button" variant="text" color="primary" onClick={() => handleOrder("all")}>
          전체 상품 주문
        </Button>
      </Box>
    </Container>
  );
}
