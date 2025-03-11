import { Architecture, BatteryChargingFull, Camera, CameraAlt, CameraAltOutlined, CameraAltTwoTone, CameraOutlined, Lens, SdCard, SdCardOutlined, Settings, ShoppingBag, Storefront, SupervisorAccount, SupervisorAccountOutlined, Videocam, VideocamOutlined } from "@mui/icons-material";
import { Grid2, Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";

// 아이콘 URL들 예시 (실제 이미지 파일이 해당 경로에 존재하는지 확인 필요)
const iconUrls = {
  camera: '/image/camera-icon.png',
  dicam: '/image/dicam-icon.png',
  lens: '/image/lens-icon.png',
  accessories: '/image/accessories-icon.png',
  rental: '/image/rental-icon.png', // 대여 아이콘 추가
};

// 마우스 오버 시 아이콘 변경용 이미지 URL
const hoverIconUrls = {
  camera: '/image/camera-icon2.png',
  dicam: '/image/dicam-icon2.png',
  lens: '/image/lens-icon2.png',
  accessories: '/image/accessories-icon2.png',
  rental: '/image/rental-icon2.png', // 대여 아이콘 hover 이미지 추가
};

const iconComponents: Record<string, any> = {
  camera: CameraAlt,
  dicam: Videocam,  // 예시로 다른 아이콘 사용
  lens: Camera,
  accessories: SdCard, // 다른 아이콘으로 변경
  rental: SupervisorAccount, // 다른 아이콘으로 변경
};
const hoverIconComponents: Record<string, any> = {
  camera: CameraAltOutlined, // hover 시에 사용할 아이콘
  dicam: VideocamOutlined, // hover 아이콘 예시
  lens: CameraOutlined, // hover 시에 다른 아이콘
  accessories: SdCardOutlined, // hover 시에 다른 아이콘
  rental: SupervisorAccountOutlined, // hover 시에 다른 아이콘
};




// 아이템과 연결된 경로 설정
const routes: Record<string, string> = {
  camera: '/product?category=camera',
  dicam: '/product?category=dicam',
  lens: '/product?category=lens',
  accessories: '/product?category=accessory',
  rental: '/rental-inquiry', // 대여 페이지 경로 추가
};

const CategoryIconBar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const theme = useTheme();

  const handleMouseEnter = (id: string) => {
    setHoveredItem(id); // 마우스 오버 시 해당 아이템의 ID 설정
  };

  const handleMouseLeave = () => {
    setHoveredItem(null); // 마우스가 아이템을 떠나면 null로 설정
  };

  const iconLabels: {id:string, label:string}[] = [
    { id: "camera", label: "중고카메라" },
    { id: "dicam", label: "중고디카" },
    { id: "lens", label: "중고렌즈" },
    { id: "accessories", label: "카메라부속" },
    { id: "rental", label: "대여" }, 
  ]

  return (
    <Grid2
      container
      spacing={6}
      sx={{
        padding: 2,
        justifyContent: "center", // 아이템을 수평으로 중앙 정렬
        alignItems: "center", // 아이템을 수직으로 중앙 정렬
        display: 'flex',
        flexWrap: 'wrap', // 화면 크기에 맞춰 항목들이 줄바꿈될 수 있게 함
      }}
    >
      {iconLabels.map((item) => {
        const Icon = hoveredItem === item.id ? hoverIconComponents[item.id] : iconComponents[item.id];
        return (
        <Grid2 size={{ xs:6, sm:6, md:2.4,}} key={item.id}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column", 
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "none",
              borderRadius: 2,
              padding: 2,
              textAlign: "center",
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
                  width: 50,
                  height: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 2,
                  transition: "background-image 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // 배경 이미지, 크기, 그림자 전환 추가
                  transform: hoveredItem === item.id ? "scale(1.1) rotate(10deg)" : "scale(1)", // 아이콘 크기 변화 및 회전
                }}
              >
                <Icon sx={{fontSize: 50}} />
              </Box>
            </a>
            {/* 아이템 텍스트 */}
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // 다크 모드일 때 글씨 색상을 흰색으로 변경
                fontWeight: 'regular',
                fontSize: '18px', // 텍스트 크기
                transition: "color 0.3s ease-in-out", // 텍스트 색상 전환 부드럽게
              }}
            >
              {item.label} {/* 아이템 텍스트 */}
            </Typography>
          </Box>
        </Grid2>
      )})}
    </Grid2>
  );
};

export default CategoryIconBar;
