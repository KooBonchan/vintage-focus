import { Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// styled 컴포넌트 정의
const WeeklyBestContainer = styled(Box)({
  width: "100%",
  backgroundColor: "grey.200",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 2,
  flexDirection: "column",
  padding: 2,
  marginTop: 100,
});

const WeeklyBestTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#fff" : "black", // 다크모드일 경우 흰색으로
  fontWeight: "bold",
}));

const ProductCard = styled(Box)({
  width: "100%",
  height: 400,
  backgroundColor: "grey.200",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 2,
  flexDirection: "column",
  padding: 2,
});

const ImageContainer = styled(Box)({
  width: "100%",
  height: "60%",
  backgroundColor: "lightgray",
  borderRadius: 10,
  marginBottom: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden", // 넘치는 부분 숨기기
  transition: "transform 0.3s ease, box-shadow 0.3s ease", // 부드러운 전환 효과 추가
  "&:hover": {
    transform: "scale(1.02)", // 마우스를 올렸을 때 이미지를 살짝 확대
    boxShadow: "0px 4px 20px rgba(179, 179, 179, 0.2)", // 그림자 효과 추가
  },
});

const TitlePriceContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: 1,
  marginTop: 1,
  paddingLeft: 25,  // 왼쪽에 여유 공간 추가
  paddingRight: 25, // 오른쪽에 여유 공간 추가
});

const ProductTitle = styled(Typography)({
  fontWeight: "bold",

});

const ProductPrice = styled(Typography)({
  fontWeight: "bold",
  color: "#AA1F3E", // 올바른 색상 코드

});


const ProductDescription = styled(Typography)({
  color: "text.secondary",
  textAlign: "left",
});

export default function WeeklyBestGallery() {
  return (
    <WeeklyBestContainer>
      <WeeklyBestTitle variant="h3">Weekly Best</WeeklyBestTitle>

      {/* Weekly Best 박스를 4칸 3줄로 배치 */}
      <Grid2 container spacing={2} sx={{ marginTop: 3 }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <ProductCard>
              {/* 이미지 박스 */}
              <ImageContainer>
                <img
                  src={`/image/sample/bestsample/bestsample${index + 1}.jpg`} 
                  alt={`product ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // 비율을 유지하면서 세로 꽉 채우기
                    borderRadius: 4,
                  }}
                />
              </ImageContainer>

              {/* 제목과 가격이 가로로 나란히 배치된 div */}
              <TitlePriceContainer>
                <ProductTitle variant="h6">
                  제품 제목 {index + 1}
                </ProductTitle>
                <ProductPrice variant="h6">100,000</ProductPrice>
              </TitlePriceContainer>

              {/* 제품 소개 내용 */}
              <ProductDescription variant="body2">
             {index + 1} 카메라 / 제조사 기흥 / 상태 A급
            
              </ProductDescription>
            </ProductCard>
          </Grid2>
        ))}
      </Grid2>
    </WeeklyBestContainer>
  );
}
