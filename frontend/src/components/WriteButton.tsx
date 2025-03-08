import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface WriteButtonProps {
  currentPath: string;
  onClick: (path: string) => void; // 클릭 이벤트를 처리하는 함수
}

function WriteButton({ currentPath, onClick }: WriteButtonProps) {
  // 각 경로에 맞는 스타일을 정의
  const getStyles = (path: string) => {
    switch (path) {
      case '/buy-inquiry':
        return {
          backgroundColor: '#333',
          color: '#f0f0f0',
          '&:hover': {
            backgroundColor: '#777777',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // hover 시 그림자 추가
          },
          iconColor: '#f0f0f0',
        };
      case '/rental-inquiry':
        return {
          color: '#333',
          '&:hover': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // hover 시 그림자 추가
          },
        };
      default:
        return {
          border: '2px solid #f0f0f0',
          color: '#333',
          '&:hover': {
            border: '2px solid #f0f0f0', // border 크기 변경 방지
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // hover 시 그림자 추가
          },
        };
    }
  };

  const styles = getStyles(currentPath);

  // 버튼 클릭 시 상위 컴포넌트에서 전달받은 onClick 호출
  const handleClick = () => {
    onClick(`${currentPath}/write`);
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        mt: 2,
        borderRadius: '20px',
        padding: '4px 16px',
        '&:hover': {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // hover 시 그림자 추가
        },
        ...styles,
        cursor: 'pointer', // 전체 박스에 커서 포인터 추가
        transition: 'all 0.2s ease', // 부드러운 전환 효과 추가
      }}
      onClick={handleClick} // 전체 박스에 클릭 이벤트 핸들러 추가
    >
      <IconButton sx={{ mr: 1, color: styles.iconColor }}>
        <EditIcon />
      </IconButton>
      <Typography
        variant="body1"
        sx={{
          fontWeight: '600',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        문의하기
      </Typography>
    </Box>
  );
}

export default WriteButton;
