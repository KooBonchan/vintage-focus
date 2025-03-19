import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SdCardIcon from '@mui/icons-material/SdCard';

/**
 * `NoticeListProps`는 NoticeList 컴포넌트에 전달될 프롭스의 타입을 정의합니다.
 */
interface NoticeListProps {
  /** 아이콘 색상 */
  iconColor?: string;
  /** 배경 색상 */
  backgroundColor?: string;
  /** 폰트 크기 (제목 및 본문에 반영) */
  fontSize?: string | number;
  /** 폰트 색상 */
  fontColor?: string;
}

/**
 * NoticeList 컴포넌트는 중요한 공지 사항을 리스트 형태로 표시합니다.
 * 각 공지 항목은 아이콘과 텍스트로 구성되어 있으며, 반응형 레이아웃을 지원합니다.
 *
 * @param iconColor 아이콘의 색상
 * @param backgroundColor 컴포넌트의 배경 색상
 * @param fontSize 제목 및 본문 텍스트의 폰트 크기
 * @param fontColor 제목 및 본문 텍스트의 색상
 */
const NoticeList: React.FC<NoticeListProps> = ({
  iconColor = "#445366",
  backgroundColor = "#f3f8fb",
  fontSize = "16px",
  fontColor = "#445366",
}) => {
  const noticeItems = [
    {
      text: "대여 날짜와 시간,\n 반납 날짜와 시간을\n 선택해주세요.",
      icon: <AccessTimeIcon sx={{ mr: 1, color: iconColor, fontSize: "30px" }} />,
    },
    {
      text: "카메라 대여와 반납은\n 반드시 같은 지점에서 \n해 주셔야 합니다.",
      icon: <ApartmentIcon sx={{ mr: 1, color: iconColor, fontSize: "30px" }} />,
    },
    {
      text: "일반카메라용\n 메모리카드는 기본으로\n 제공되지 않습니다.",
      icon: <SdCardIcon sx={{ mr: 1, color: iconColor, fontSize: "30px" }} />,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 1.5, sm: 2 },
        mb: 2,
        borderRadius: "8px",
        bgcolor: backgroundColor,
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: fontColor,
          fontWeight: "bold",
          mb: 1.5,
          textAlign: "center",
          fontSize: { xs: "24px", sm: "32px" }, // NOTICE 제목 폰트 크기 크게 수정
        }}
      >
        NOTICE
      </Typography>
      <Grid container spacing={2}>
        {Array.isArray(noticeItems) && noticeItems.length > 0 ? (
          noticeItems.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  px: 1,
                }}
              >
                {item.icon}
                <Typography
                  variant="body1"
                  sx={{
                    color: fontColor,
                    fontSize: { xs: `calc(${fontSize} * 0.75)`, sm: `calc(${fontSize} * 0.875)`, md: fontSize },
                    lineHeight: "1.6",
                    mt: 1,
                    wordBreak: "break-word",
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: "#ff0000", textAlign: "center", width: "100%" }}>
            목록이 없습니다.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default NoticeList;
