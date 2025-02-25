import { useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, Typography, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// 장바구니 샘플 데이터
const sampleCartItems = [
  { id: 1, image: "https://placehold.co/100x100", name: "빈티지 카메라", price: 120000, quantity: 1, shipping: 3000 },
  { id: 2, image: "https://placehold.co/100x100", name: "필름 카메라", price: 150000, quantity: 1, shipping: 3000 },
  { id: 3, image: "https://placehold.co/100x100", name: "DSLR 카메라", price: 1200000, quantity: 1, shipping: 5000 },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 개별 체크박스 핸들러
  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 전체 선택 체크박스 핸들러
  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === cartItems.length ? [] : cartItems.map((item) => item.id));
  };

  // 수량 증가/감소 핸들러
  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  // 선택된 상품 총 가격 계산
  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 선택된 상품 배송비 계산
  const totalShipping = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.shipping, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        장바구니
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          {/* 테이블 헤더 */}
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedItems.length > 0 && selectedItems.length < cartItems.length}
                  checked={selectedItems.length === cartItems.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>상품 옵션정보</TableCell>
              <TableCell>수량</TableCell>
              <TableCell>상품 금액</TableCell>
              <TableCell>배송비</TableCell>
            </TableRow>
          </TableHead>

          {/* 테이블 바디 */}
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                {/* 체크박스 */}
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => {handleSelectItem(item.id);}}
                  />
                </TableCell>

                {/* 상품 정보 */}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img src={item.image} alt={item.name} width={60} height={60} />
                    <Typography>{item.name}</Typography>
                  </Box>
                </TableCell>

                {/* 수량 조절 */}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => { handleQuantityChange(item.id, -1); }}>

                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => { handleQuantityChange(item.id, 1); }}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>

                {/* 상품 금액 */}
                <TableCell>{(item.price * item.quantity).toLocaleString()}원</TableCell>

                {/* 배송비 */}
                <TableCell>{item.shipping.toLocaleString()}원</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 합계 및 주문 버튼 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
        <Typography>
          총 {totalPrice.toLocaleString()}원 + 배송비 {totalShipping.toLocaleString()}원 = 합계{" "}
          {(totalPrice + totalShipping).toLocaleString()}원
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" color="primary">
            선택 상품 주문
          </Button>
          <Button variant="contained" color="primary">
            전체 상품 주문
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
