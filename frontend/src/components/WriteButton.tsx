import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

interface WriteButtonProps {
  currentPath: string;
}

function WriteButton({ currentPath }: WriteButtonProps) {
  const navigate = useNavigate();

  // 각 경로에 맞는 스타일을 정의
  const getStyles = (path: string) => {
    switch (path) {
      case '/buy-inquiry':
        return {
          backgroundColor: '#333',
          color: '#f0f0f0',
          '&:hover': {
            backgroundColor: '#777777',
          },
          iconColor: '#f0f0f0',
        };
      case '/rental-inquiry':
        return {
          color: '#333',
          '&:hover': {},
        };
      default:
        return {
          border: '2px solid #f0f0f0',
          color: '#333',
          '&:hover': {
            border: '1px solid #e0e0e0',
          },
        };
    }
  };

  const styles = getStyles(currentPath);

  const handleClick = () => {
    navigate(`${currentPath}/write`);
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
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
        ...styles,
        cursor: 'pointer', // 전체 박스에 커서 포인터 추가
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