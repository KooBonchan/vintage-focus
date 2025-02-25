import { Grid, Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";

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

const CategoryIconBar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const theme = useTheme(); // Get theme to check dark or light mode

  const handleMouseEnter = (id: string) => {
    setHoveredItem(id); // 마우스 오버 시 해당 아이템의 ID 설정
  };

  const handleMouseLeave = () => {
    setHoveredItem(null); // 마우스가 아이템을 떠나면 null로 설정
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {[
        { id: "camera", label: "중고카메라" },
        { id: "dicam", label: "중고디카" },
        { id: "lens", label: "중고렌즈" },
        { id: "accessories", label: "카메라부속" }
      ].map((item) => (
        <Grid item xs={6} sm={6} md={3} key={item.id}> {/* Changed to xs={6} for 2 items per row */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column", // 상하로 배치
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "none",
              borderRadius: 2,
              padding: 2,
              textAlign: "center", // 텍스트 정렬
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
                  backgroundSize: "contain", // 이미지를 비율 유지하면서 맞춤
                  backgroundPosition: "center",
                  borderRadius: 2,
                  transition: "background-image 0.3s ease-in-out", // 부드러운 전환 효과 추가
                }}
              />
            </a>
            {/* 아이템 텍스트 */}
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Dynamically change text color based on dark/light mode
                fontWeight: 'regular',
                fontSize: '18px', // 텍스트 크기
              }}
            >
              {item.label} {/* 아이템 텍스트 */}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryIconBar;
