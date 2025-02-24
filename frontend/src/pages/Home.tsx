import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThemedContainer from "../components/ThemedContainer";

// StyledImageBox 정의
const StyledImageBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  borderRadius: theme.shape.borderRadius,
  paddingTop: theme.spacing(8),
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  backgroundImage: theme.palette.mode === 'dark'
    ? "url(/image/main.jpg)"  // 다크 모드일 때 이미지
    : "url(/image/main.jpg)",  // 기본 모드일 때 이미지
  backgroundSize: "cover",
  backgroundPosition: "center",
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(10),
    height: 400,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: theme.palette.grey[700],
  }),
}));

// 아이콘 URL들 예시 (실제 이미지 파일이 해당 경로에 존재하는지 확인 필요)
const iconUrls = {
  camera: '/image/camera-icon.png',
  dicam: '/image/dicam-icon.png',
  lens: '/image/lens-icon.png',
  accessories: '/image/accessories-icon.png',
};

// 마우스 오버 시 아이콘 변경용 이미지 URL
const hoverIconUrls = {
  camera: '/image/camera-icon2.png',
  dicam: '/image/dicam-icon2.png',
  lens: '/image/lens-icon2.png',
  accessories: '/image/accessories-icon2.png',
};

// 아이템과 연결된 경로 설정
const routes = {
  camera: '/camera',
  dicam: '/dicam',
  lens: '/lens',
  accessories: '/accessories',
};

export function Home() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setHoveredItem(id); // 마우스 오버 시 해당 아이템의 ID 설정
  };

  const handleMouseLeave = () => {
    setHoveredItem(null); // 마우스가 아이템을 떠나면 null로 설정
  };

  return (
    <ThemedContainer sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> {/* flex로 설정 */}
      <StyledImageBox id="image" />
      {/* 네 개의 아이템을 감싸는 큰 DIV */}
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {[
          { id: "camera", label: "중고카메라" },
          { id: "dicam", label: "중고디카" },
          { id: "lens", label: "중고렌즈" },
          { id: "accessories", label: "카메라부속" }
        ].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",  // 상하로 배치
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "none",
                borderRadius: 2,
                padding: 2,
                textAlign: "center",  // 텍스트 정렬
              }}
            >
              {/* 아이템 이미지 */}
              <a
                href={routes[item.id]}
                style={{ display: 'block', marginBottom: '10px' }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundImage: `url(${
                      hoveredItem === item.id ? hoverIconUrls[item.id] : iconUrls[item.id]
                    })`,
                    backgroundSize: "contain",  // 이미지를 비율 유지하면서 맞춤
                    backgroundPosition: "center",
                    borderRadius: 2,
                    transition: "background-image 0.3s ease-in-out", // 부드러운 전환 효과 추가
                  }}
                />
              </a>
              {/* 아이템 텍스트 */}
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                {item.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* New Item을 감싸는 큰 div */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "none", // 배경색을 none으로 설정
          padding: 4,
          textAlign: "center",
          borderRadius: 2,
          marginTop: 4,
        }}
      >
        <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold' }}>
          New Item
        </Typography>

        {/* New Item 박스 두 개 가로 배치 */}
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                width: "100%",
                height: 300,
                backgroundColor: "grey.300",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6">박스 1</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                width: "100%",
                height: 300,
                backgroundColor: "grey.400",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6">박스 2</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>





    </ThemedContainer>
  );
}
