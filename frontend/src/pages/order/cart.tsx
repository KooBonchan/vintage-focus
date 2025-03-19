import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Checkbox, Button, Typography, Box, IconButton, 
  styled
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import './Cart.css';  // CSS 파일 임포트
import useCartStore from "@/stores/cartStore";

const CardTotalBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 24,
  padding: 16,
  border: '1px solid #ddd',
  borderRadius: 16,
  backgroundColor: {'light': '#f9f9f9', 'dark':'#000'},
  fontWeight: 'bold',
  // width: 1155,

  flexShrink: 0,
});

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCartStore(); // Zustand에서 상태 불러오기
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

  const totalPrice = cartItems
  .filter((item) => selectedItems.includes(item.id))
  .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalShipping = 3000;
  

  const handleOrder = (type: "selected" | "all") => {
    const orderItems = type === "selected" ? cartItems.filter(item => selectedItems.includes(item.id)) : cartItems;

    if (orderItems.length === 0) {
      alert("주문할 상품을 선택해주세요!");
      return;
    }

    void navigate("/order/delivery", { state: { orderItems } });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>장바구니</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: {"light": "#f5f5f5", "dark": "#000"} }}>
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
            </TableRow>
          </TableHead>

          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => { handleSelectItem(item.id); }}
                  />
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </TableCell>

                <TableCell sx={{ textAlign: "center" }} className="cart-item-name">{item.name}</TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  <Box className="quantity-container">
                    <IconButton onClick={() => { updateQuantity(item.id, item.quantity - 1); }}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => { updateQuantity(item.id, item.quantity + 1); }}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>{(item.price * item.quantity).toLocaleString()}원</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CardTotalBox>
      <Typography variant="body1" sx={{ fontSize: 16 }}>
      총 {totalPrice.toLocaleString()}원 + 배송비 {totalShipping.toLocaleString()}원 = 합계{" "}
      {(totalPrice + totalShipping).toLocaleString()}원
      </Typography>
      </CardTotalBox>


    {/* 장바구니 삭제 버튼 (왼쪽 하단) */}
    <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
        <Button variant="text" color="secondary" onClick={() => {
          selectedItems.forEach(id => { removeFromCart(id); });
          setSelectedItems([]); // 선택 해제
        }} disabled={selectedItems.length === 0}>
          선택 상품 삭제
        </Button>

        <Button className="cart-delete-button" variant="text" color="error" onClick={() => {
          clearCart();
          setSelectedItems([]); // 선택 해제
        }}>
          전체 삭제
        </Button>
      </Box>

      {/* 버튼을 오른쪽 하단에 배치 */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="text" color="primary" onClick={() => { handleOrder("selected"); }} sx={{ mr: 2 }}>
          선택 상품 주문
        </Button>
        <Button variant="text" color="primary" onClick={() => { handleOrder("all"); }}>
          전체 상품 주문
        </Button>
      </Box>
    </Container>
  );
}
