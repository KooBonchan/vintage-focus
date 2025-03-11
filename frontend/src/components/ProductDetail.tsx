import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { ChatBubbleOutline, FavoriteBorder, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    shipping: number;
    image: string;
  };
  buttonBackgroundColor?: string;
}

export function ProductDetail({ product, buttonBackgroundColor }: ProductDetailProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push({ ...product, quantity });
      localStorage.setItem("cart", JSON.stringify(cart));
      setOpen(true);
    } catch (error) {
      console.error("장바구니 저장 오류:", error);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const buttonStyle = {
    borderRadius: "3em",
    color: "#445366",
    padding: "5px 16px",
    fontSize: "12px",
    fontWeight: 700,
    border: "1px solid #445366",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      color: "#aa1f3e",
      border: "1px solid #aa1f3e",
    },
  };

  return (
    <Container sx={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 0" }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "500px",
              height: "450px",
              bgcolor: "#ddd",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              mx: "auto",
            }}
          >
            <img
              src={product.image || "/image/imsi.jpg"}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "20px" }}>
              {product.name}
            </Typography>
            <Box>
              <IconButton
                sx={{ padding: 0, margin: "0 4px", border: "none", "&:hover": { backgroundColor: "#e0e0e0" } }}
                onClick={() => navigate(`/inquiry/${product.id}`)}
              >
                <ChatBubbleOutline />
              </IconButton>
              <IconButton
                sx={{ padding: 0, margin: "0 4px", border: "none", "&:hover": { backgroundColor: "#e0e0e0" } }}
                onClick={() => console.log("찜하기 기능 추가 예정")}
              >
                <FavoriteBorder />
              </IconButton>
              <IconButton
                sx={{ padding: 0, margin: "0 4px", border: "none", "&:hover": { backgroundColor: "#e0e0e0" } }}
                onClick={handleAddToCart}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ my: 0.25 }} />

          <Box sx={{ textAlign: "left", mt: 2, mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              상품 설명
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "12px", mt: 1 }}>
              여기서 상품 설명을 짧게 추가할 수 있습니다.
            </Typography>
          </Box>

          <Divider sx={{ my: 0.75 }} />

          {/* 가격 부분을 오른쪽으로 정렬 */}
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#027af2" }}>
              {product.price.toLocaleString()}원
            </Typography>
          </Box>

          <Divider sx={{ my: 0.75 }} />

<Grid container spacing={2} justifyContent="center">
  <Grid item xs={4} sx={{ textAlign: "center" }}>
    <Typography variant="body1" sx={{ fontSize: "14px", color: "black" }}>
      가격
    </Typography>
    <Typography variant="body1" sx={{ fontSize: "16px", color: "black" }}>
      {product.price.toLocaleString()}원
    </Typography>
  </Grid>
  <Grid item xs={4} sx={{ textAlign: "center" }}>
    <Typography variant="body1" sx={{ fontSize: "14px", color: "black" }}>
      수량
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
      <IconButton onClick={handleDecrement} sx={{ padding: "5px" }}>
        <Typography variant="h6">-</Typography>
      </IconButton>
      <TextField
        value={quantity}
        onChange={handleQuantityChange}
        type="number"
        variant="outlined"
        sx={{
          width: "60px",
          "& input": { 
            fontSize: "14px", 
            padding: "8px 0", 
            textAlign: "center",
          },
          "& .MuiOutlinedInput-root": {
            height: "36px",
          },
        }}
        inputProps={{ min: 1 }}
      />
        <IconButton onClick={handleIncrement} sx={{ padding: "5px" }}>
          <Typography variant="h6">+</Typography>
        </IconButton>
      </Box>
    </Grid>
    <Grid item xs={4} sx={{ textAlign: "center" }}>
      <Typography variant="body1" sx={{ fontSize: "14px", color: "black" }}>
        합계
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "16px", color: "black" }}>
        {(product.price * quantity).toLocaleString()}원
      </Typography>
    </Grid>
  </Grid>

  <Divider sx={{ my: 0.75 }} />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
            <Button
              variant="text"
              sx={buttonStyle}
              onClick={() => navigate("/order/delivery", { state: { orderItems: [{ ...product, quantity }] } })}
            >
              구매하기
            </Button>
            <Button variant="text" sx={buttonStyle} onClick={handleAddToCart}>
              장바구니
            </Button>
            <Button variant="text" sx={buttonStyle} onClick={() => navigate("/rental-inquiry/write")}>
              대여문의
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>장바구니에 상품이 담겼습니다.</DialogTitle>
        <DialogContent>장바구니로 이동하시겠습니까?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={buttonStyle}>
            계속 쇼핑하기
          </Button>
          <Button onClick={() => navigate("/order/cart")} sx={buttonStyle}>
            장바구니 이동
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ pt: 15, pb: 7 }}>
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray", mb: 2 }}>
          Product Details
        </Typography>
        <Divider />
        <Box sx={{ width: "100%", height: 800, bgcolor: "#ddd", mt: 7, borderRadius: 2 }} />
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box sx={{ width: "100%", height: 150, bgcolor: "#ddd", borderRadius: 2, mt: 2 }} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5" fontWeight="bold"></Typography>
            <div style={{ marginTop: "20px" }}>
              <Typography variant="h6" sx={{ textAlign: "center", color: "gray", mb: 2 }}>
                상품이름과 설명
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}