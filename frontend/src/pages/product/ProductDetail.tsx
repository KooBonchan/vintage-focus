import { Box, Container, Typography, Button, Grid, Divider, IconButton, ListItem, ListItemAvatar, Avatar, ListItemText, List, Dialog, DialogTitle, DialogContent, DialogActions, useTheme, Skeleton, Stack } from "@mui/material";
import { ChatBubbleOutline, FavoriteBorder, Add, MoreVert, VisibilityOutlined } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductResponse } from "@/types/response";
import { readProductDetail } from "@/api/productApi";

export function ProductDetail() {
  const theme = useTheme(); // ✅ MUI 테마 적용
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 추가
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [noItem, setNoItem] = useState(false);

  useEffect(() => {
    if(!id) {
      setProduct(null);
      setNoItem(true);
      return;
    }
    const idNum = Number.parseInt(id);
    if(idNum < 1) {
      setProduct(null);
      setNoItem(true);
      return;
    }

    readProductDetail(idNum)
    .then(setProduct)
    .then(_=>{ setNoItem(false); })
    .catch(_=>{ setNoItem(true); });
  },[id, setProduct, setNoItem]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setOpen(true);
  };
  
  return (
    <Container
      sx={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 0",
        backgroundColor: theme.palette.mode === "dark" ? "#000" : "#f9f9f9",
        color: theme.palette.text.primary,
      }}
    >
      {/* 상단 상품 정보 */}
      <Grid container spacing={4} alignItems="center">
        {/* 상품 이미지 */}
        <Grid item xs={12} md={6}>
          {product ? (
            <div
              style={{
                width: '500px', // Fixed width of the wrapper
                height: '450px', // Fixed height of the wrapper
                display: 'flex', // Use flex to center the image
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
                overflow: 'hidden', // Prevent overflow
              }}
            >
              <img
                src={
                  product.productImages
                    ? `${import.meta.env.VITE_IMAGE_RESOURCE_ROOT}/${product.productImages[0]}`
                    : '/image/icon/camera.svg'
                }
                alt={product.productName}
                style={{
                  maxWidth: '100%', // Ensure image scales down if needed
                  maxHeight: '100%', // Ensure image scales down if needed
                  objectFit: 'contain', // Maintain aspect ratio without cropping
                }}
              />
            </div>
          ) : (
            <Skeleton variant="rectangular" height={'450px'} />
          )}
        </Grid>

        {/* 상품 정보 */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {product ? (
              <Typography variant="h5" fontWeight="bold">
                {product.productName}
              </Typography>
            ) : (
              <Skeleton sx={{flexGrow: "1"}} />
            )}
            

            {/* 아이콘 버튼들 */}
            <Box>
              {[ChatBubbleOutline, FavoriteBorder, Add].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    padding: 0,
                    margin: "0 4px",
                    border: "none",
                    "&:hover": { backgroundColor: theme.palette.mode === "dark" ? "#333" : "#e0e0e0" },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* 가격 */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
            <Typography variant="body1">가격</Typography>
            {product ? (
              <Box display="flex" gap={0.5} alignItems="center">
              {product.consumerPrice && 
                <Typography
                  fontWeight="regular"
                  sx={{
                    textDecoration:"line-through",
                    color: theme.palette.grey[500],
                  }}>
                  {product.consumerPrice.toLocaleString()}
                </Typography>
              }
              <Typography variant="h5" fontWeight="bold">
                {product.sellingPrice.toLocaleString()}원
              </Typography>
              </Box>
            ) : (
              <Skeleton width="30%" />
            )}
          </Box>
          <Divider sx={{ my: 2 }} />

          {/* 추가 정보 */}
          <Box sx={{ textAlign: "left", mt: 5, mb: 5 }}>
            {product ? (
              <>
                <Typography variant="h5" fontWeight="bold">
                  {product.productName || "Unnamed Product"}
                </Typography>
                <Typography sx={{ color: "gray", fontSize: "14px", mt: 1 }}>
                  {product.company ?? "Unknown Brand"} - {product.country ?? "Unknown Country"}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mt: 1, color: "gray", fontSize: "14px" }}>
                  <Typography>Condition: {product.condition ?? "N/A"}</Typography>
                  <Typography>Stock: {product.stock === -1 ? "N/A" : product.stock}</Typography>
                </Stack>

                <Stack direction="row" spacing="2" sx={{ mt: 1, color: "gray", fontSize: "14px" }}>
                  <ChatBubbleOutline />
                  <Typography pl={0.2} pr={1}>{product.reviewCount ?? 0} </Typography>
                  <FavoriteBorder />
                  <Typography pl={0.2} pr={1}>{product.likeCount ?? 0} </Typography>
                  <VisibilityOutlined />
                  <Typography pl={0.2} pr={1}>{product.viewCount ?? 0} </Typography>
                </Stack>
              </>
            ) : (
              <>
                <Skeleton width="30%" height={30} />
                <Skeleton width="50%" height={20} sx={{ mt: 1 }} />
                <Skeleton width="60%" height={20} sx={{ mt: 1 }} />
                <Skeleton width="60%" height={20} sx={{ mt: 1 }} />
              </>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* 버튼 영역 */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4, fontSize:'1rem' }}>
            <Button
              variant="text"
              sx={{ borderRadius: 2, backgroundColor: theme.palette.mode === "dark" ? "#444" : "#ccc", color: "black", px: 4 }}
              onClick={() => {navigate("/order/delivery", 
                { state: { 
                  orderItems: [{
                    name: product?.modelName,
                    image: product?.productImages[0],
                    quantity: 1,
                    price: product?.sellingPrice
              }] } });return;}}
            >
              구매하기
            </Button>

            <Button
              variant="text"
              sx={{ borderRadius: 2, backgroundColor: theme.palette.mode === "dark" ? "#555" : "#bbb", color: "black", px: 4 }}
              onClick={handleAddToCart}
            >
              장바구니
            </Button>

            <Button
              variant="text"
              sx={{ borderRadius: 2, backgroundColor: theme.palette.mode === "dark" ? "#555" : "#bbb", color: "black", px: 4 }}
              onClick={() => navigate("/rental-inquiry/write/" + product?.id)}
            >
              대여문의
            </Button>
          </Box>
        </Grid>

        {/* 장바구니 모달 */}
        <Dialog open={open} onClose={() => { setOpen(false); }}>
          <DialogTitle>장바구니에 상품이 담겼습니다.</DialogTitle>
          <DialogContent>장바구니로 이동하시겠습니까?</DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpen(false); }}>계속 쇼핑하기</Button>
            <Button onClick={() => navigate("/order/cart")} color="primary">
              장바구니 이동
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>

      {/* 상세 정보 영역 */}
      <Box sx={{ pt: 15, pb: 7 }}>
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray", mb: 2 }}>
          Product Details
        </Typography>

        <Divider />

        {/* 큰 상세 이미지 */}
        <Box mt={7} borderRadius={2}>
        {
          product?
          <img
            src={product.category2 === 'Cameras' ? "/image/product/vfcamera.jpg" : "/image/product/vflen.jpg" }
            alt={`Product Detail image: ${product.productName}`} />
          :
          <Skeleton width="100%" variant="rectangular" height="800px" />
        }
        </Box>

        <Divider sx={{ my: 3 }} />

      </Box>

      <Box sx={{ pt: 7, pb: 7, bgcolor: {"light":"#ffffff", "dark":"#161616"}, borderRadius: 2, p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Featured
          </Typography>
          <Button variant="text" sx={{ minWidth: "auto", color: "black", fontSize: "18px", p: 0 }}>
            →
          </Button>
        </Box>
        <List>
          {[
            { id: 1, name: "빈티지 카메라", desc: "고급 필름 카메라", img: "https://placehold.co/50x50" },
            { id: 2, name: "DSLR 카메라", desc: "전문가용 DSLR", img: "https://placehold.co/50x50" },
            { id: 3, name: "미러리스 카메라", desc: "가벼운 미러리스", img: "https://placehold.co/50x50" },
            { id: 4, name: "즉석 카메라", desc: "즉석에서 인화", img: "https://placehold.co/50x50" },
            { id: 5, name: "액션 카메라", desc: "스포츠용 캠", img: "https://placehold.co/50x50" }
          ].map((product, index, array) => (
            <Box key={product.id}>
              <ListItem sx={{ bgcolor: {"light":"#ffffff", "dark":"#161616"}, py: 2, borderRadius: 2, position: "relative" }}>
                <ListItemAvatar>
                  <Avatar src={product.img} sx={{ width: 50, height: 50 }} />
                </ListItemAvatar>
                <ListItemText primary={product.name} secondary={product.desc} />
                <IconButton sx={{ position: "absolute", top: 8, right: 8 }}>
                  <MoreVert />
                </IconButton>
              </ListItem>
              {index < array.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}
        </List>
      </Box>

    </Container>
  );
}
