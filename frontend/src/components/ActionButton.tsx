import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // react-icons에서 장바구니 아이콘 가져오기

// ActionButton의 prop 타입 정의
export interface ActionButtonProps {
  width: number;
  height: number;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
  content: string;
  onClick: () => void;
  fontColor?: string; // fontColor를 선택적으로 추가
  borderWidth?: number; // 테두리 두께 추가 (옵션)
  borderStyle?: string; // 테두리 스타일 추가 (옵션)
}

// 액션 버튼 컴포넌트
const ActionButton = ({
  width,
  height,
  backgroundColor,
  borderColor,
  borderRadius,
  content,
  onClick,
  fontColor, // fontColor prop 추가
  borderWidth = 1, // 기본값 1px
  borderStyle = 'solid', // 기본값 solid
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderRadius: borderRadius,
        borderWidth: `${borderWidth}px`,  // 테두리 두께 적용
        borderStyle: borderStyle,  // 테두리 스타일 적용
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        fontWeight: '500',
        cursor: 'pointer',
        padding: '0',
        lineHeight: 'normal',
        color: fontColor, // fontColor를 style에 반영
        transition: 'all 0.1s ease', // 부드러운 전환 효과
      }}
      // 눌린 상태에서의 스타일 변경
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)'; // 버튼 눌릴 때 축소 효과
        e.currentTarget.style.boxShadow = '0 4px 5px rgba(0, 0, 0, 0.2)'; // 눌릴 때 그림자 추가
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)'; // 눌린 상태에서 다시 원래 크기로
        e.currentTarget.style.boxShadow = 'none'; // 그림자 제거
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'; // 버튼을 떠날 때 다시 원래 크기로
        e.currentTarget.style.boxShadow = 'none'; // 그림자 제거
      }}
    >
      {content}
    </button>
  );
};

export default ActionButton;

