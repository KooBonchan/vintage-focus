import { useState } from "react";
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";

const AdminProducts = () => {
  // 상품 목록 상태
  const [products, setProducts] = useState([
    { id: 1, name: "빈티지 카메라 A", price: 50000 },
    { id: 2, name: "렌즈 B", price: 120000 },
  ]);

  // 상품 등록 폼 상태
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // 상품 추가 핸들러
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const newItem = { id: products.length + 1, ...newProduct, price: Number(newProduct.price) };
    setProducts([...products, newItem]);
    setNewProduct({ name: "", price: "" }); // 입력 필드 초기화
  };

  return (
    <Box sx={{  width: "calc(100% - 260px)", mt: 4, display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 1200, width: "100%" }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          상품 관리
        </Typography>

        {/* 상품 등록 폼 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>📦 상품 추가</Typography>
          <TextField
            label="상품명"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="가격"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddProduct} fullWidth>
            상품 추가
          </Button>
        </Paper>

        {/* 상품 목록 테이블 */}
        <Typography variant="h6" gutterBottom>상품 목록</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell align="center"><b>ID</b></TableCell>
                <TableCell align="center"><b>상품명</b></TableCell>
                <TableCell align="center"><b>가격</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell align="center">{product.id}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.price.toLocaleString()}원</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminProducts;
