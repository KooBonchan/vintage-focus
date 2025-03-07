import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface WriteButtonProps {
  currentPath: string;
  onClick: (path: string) => void;
}

function WriteButton({ currentPath, onClick }: WriteButtonProps) {
  const getStyles = (path: string) => {
    switch (path) {
      case '/buy-inquiry':
        return {
          backgroundColor: '#333',
          color: '#f0f0f0',
          '&:hover': {
            backgroundColor: '#777777',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          },
          iconColor: '#f0f0f0',
        };
      case '/rental-inquiry':
        return {
          color: '#333',
          '&:hover': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          },
        };
      default:
        return {
          backgroundColor: 'transparent', // 배경색 투명하게 변경
          border: 'none', // 테두리 제거
          color: '#333',
          '&:hover': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          },
        };
    }
  };

  const styles = getStyles(currentPath);

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
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        },
        ...styles,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onClick={handleClick}
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