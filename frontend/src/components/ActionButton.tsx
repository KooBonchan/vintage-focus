import React, { useState } from 'react';
import { Add, Remove } from "@mui/icons-material";
import { styled } from "@mui/material";

// 버튼 속성 타입 정의
export interface ButtonProps {
  type: 'p+' | 'm-';  // 플러스와 마이너스 버튼 타입
  backgroundColor?: string;
  borderColor?: string;
  onClick?: () => void;
  onChange?: (count: number) => void; // 카운트 변경 시 호출될 콜백 함수 추가
}

// 커스텀 버튼 스타일
const CustomButton = styled('button')<ButtonProps>(({
  type, backgroundColor, borderColor
}) => {
  const size = '30px';  // 버튼 크기 설정 (작은 크기)

  return {
    backgroundColor,
    borderColor,
    borderRadius: '50%',  // 원형 버튼
    width: size,
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid',
    cursor: 'pointer',
    fontSize: '14px',  // 글자 크기 줄이기
    transition: 'background-color 0.3s, border-color 0.3s',
    '&:hover': {
      backgroundColor: backgroundColor ? darken(backgroundColor, 0.1) : '#f0f0f0',  // hover시 배경색 변화
    },
    '&:active': {
      backgroundColor: backgroundColor ? darken(backgroundColor, 0.2) : '#e0e0e0',  // active 상태에서 배경색 변화
    },
  };
});

// 색상 어두운 처리 함수
const darken = (color: string, amount: number) => {
  const hex = color.replace('#', '');
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  r = Math.max(0, Math.min(255, r - amount * 255));
  g = Math.max(0, Math.min(255, g - amount * 255));
  b = Math.max(0, Math.min(255, b - amount * 255));

  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
};

// 기본 UI 컴포넌트 (플러스/마이너스 버튼)
export const ActionButton = ({
  type,
  backgroundColor = '#ffffff',
  borderColor = '#555ab9',
  onChange, // onChange 프롭 추가
  ...props
}: ButtonProps) => {
  let buttonContent;

  // "+" 버튼일 경우 Add 아이콘 사용, "-" 버튼일 경우 Remove 아이콘 사용
  if (type === 'p+') {
    buttonContent = <Add sx={{ fontSize: '18px' }} />;  // 아이콘 크기 줄이기
  } else {
    buttonContent = <Remove sx={{ fontSize: '18px' }} />;  // 아이콘 크기 줄이기
  }

  return (
    <CustomButton type={type} backgroundColor={backgroundColor} borderColor={borderColor} {...props}>
      {buttonContent}
    </CustomButton>
  );
};

// 카운터 컴포넌트
export const Counter = ({ initialCount = 0 }: { initialCount?: number }) => {
  const [count, setCount] = useState(initialCount);

  const handleCountChange = (newCount: number) => {
    setCount(newCount);
  };

  const handlePlusClick = () => {
    handleCountChange(count + 1);
  };

  const handleMinusClick = () => {
    if (count > 0) {
      handleCountChange(count - 1);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ActionButton type="m-" onClick={handleMinusClick} />
      <span style={{ margin: '0 10px' }}>{count}</span>
      <ActionButton type="p+" onClick={handlePlusClick} />
    </div>
  );
};