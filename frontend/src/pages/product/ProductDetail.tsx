import { Box, Container, Typography, Button, Grid, Divider, IconButton, ListItem, ListItemAvatar, Avatar, ListItemText, List } from "@mui/material";
import { ChatBubbleOutline, FavoriteBorder, Add, MoreVert } from "@mui/icons-material";
import { useParams } from "react-router-dom";




export function ProductDetail() {
  const { id } = useParams();

  return (
    <Container sx={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 0" }}>
      {/* 상단 상품 정보 */}
      <Grid container spacing={4} alignItems="center">
        {/* 상품 이미지 */}
        <Grid item xs={12} md={6}>
        <Box
    sx={{
      width: "500px",  // 너비 고정
      height: "450px", // 높이 고정
      bgcolor: "#ddd",
      borderRadius: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    {/* 이미지가 들어갈 자리 */}
  </Box>
        </Grid>

        {/* 상품 정보 */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold">
              어쩌구 저쩌구
            </Typography>

            {/* 아이콘 버튼들 */}
            <Box>
              <IconButton>
                <ChatBubbleOutline />
              </IconButton>
              <IconButton>
                <FavoriteBorder />
              </IconButton>
              <IconButton>
                <Add />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* 가격 */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt:2, }}>
            <Typography variant="body1">가격</Typography>
            <Typography variant="h6" fontWeight="bold">
              1,000,000원
            </Typography>

          </Box>

          <Divider sx={{ my: 2 }} />

          {/* 추가 정보 */}
          <Box sx={{ textAlign: "left", mt:5, mb:5,}}>
          <Typography variant="h6" fontWeight="bold">
            Title
          </Typography>
          <Typography sx={{ color: "gray", fontSize: "14px", mt: 1 }}>
            Updated today <br />
            Updated today <br />
            Updated today
          </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* 상품 사양 테이블 */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body1">상품명</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">상품 수</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">가격</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* 버튼 영역 */}
          <Box sx={{ display: "flex", gap: 2 , justifyContent: "center" , mt: 4, }}>
            <Button variant="text" sx={{ borderRadius: 2, bgcolor: "#ccc", color: "black", px: 4, }}>
              구매하기
            </Button>
            <Button variant="text" sx={{ borderRadius: 2, bgcolor: "#bbb", color: "black", px: 4, }}>
              장바구니
            </Button>
          </Box>
        </Grid>
      </Grid>
       
      {/* 상세 정보 영역 */}
      <Box sx={{pt: 15, pb: 7}}>
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray", mb: 2 }}>
          Updated today　　　 | 　　　Updated today　　　 | 　　　Updated today
        </Typography>

        <Divider />

        {/* 큰 상세 이미지 */}
        <Box sx={{ width: "100%", height: 800, bgcolor: "#ddd", mt: 7, borderRadius: 2,  }} />

        <Divider sx={{ my: 3 }} />

        {/* 상세 설명 */}
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box sx={{ width: "100%", height: 150, bgcolor: "#ddd", borderRadius: 2, mt:2,  }} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5" fontWeight="bold" >
              어쩌구 저쩌구
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "14px", mt: 1 }}>
              <strong>Title</strong> <br />
              Updated today Updated today Updated today Updated today Updated today Updated today Updated today Updated today Updated today Updated today Updated today
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ pt: 7, pb: 7, bgcolor: "#f9f6fb", borderRadius: 2, p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap:1, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">Featured</Typography>
        <Button variant="text" sx={{ minWidth: "auto", color: "black", fontSize: "18px" , P:0 }}>
          →
        </Button>
      </Box>
      <List>
  {[
    { id: 1, name: "빈티지 카메라", desc: "고급 필름 카메라", img: "https://placehold.co/50x50" },
    { id: 2, name: "DSLR 카메라", desc: "전문가용 DSLR", img: "https://placehold.co/50x50" },
    { id: 3, name: "미러리스 카메라", desc: "가벼운 미러리스", img: "https://placehold.co/50x50" },
    { id: 4, name: "즉석 카메라", desc: "즉석에서 인화", img: "https://placehold.co/50x50" },
    { id: 5, name: "액션 카메라", desc: "스포츠용 캠", img: "https://placehold.co/50x50" },
  ].map((product, index, array) => (

    <Box key={product.id}>
      {/* 리스트 아이템 */}
      <ListItem sx={{ bgcolor: "#fdf7ff", py: 2, borderRadius: 2, position: "relative" }}>
        <ListItemAvatar>
          <Avatar src={product.img} sx={{ width: 50, height: 50 }} />
        </ListItemAvatar>
        <ListItemText primary={product.name} secondary={product.desc} />

        {/*MoreVert 버튼 */}
        <IconButton sx={{ position: "absolute", top: 8, right: 8 }}>
          <MoreVert />
        </IconButton>
      </ListItem>

      {/* 구분선 */}
      {index < array.length - 1 && <Divider sx={{ my: 1 }} />}
    </Box>
  ))}
</List>

      </Box>

    </Container>



    
  );
}
