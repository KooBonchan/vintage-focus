import React from 'react';

interface ButtonProps {
  width?: number;              // 버튼의 너비
  height?: number;             // 버튼의 높이
  backgroundColor?: string;    // 배경색
  borderColor?: string;        // 테두리 색
  borderRadius?: number;       // 테두리 반경
  onClick?: () => void;        // 버튼 클릭 핸들러
  children: React.ReactNode;   // 버튼에 들어갈 텍스트
  disabled?: boolean;          // 비활성화 상태 여부
}

const Button: React.FC<ButtonProps> = ({
  width = 66,                 // 기본 너비 66px
  height = 22,                // 기본 높이 22px
  backgroundColor = 'white',  // 기본 배경색은 흰색
  borderColor = '#AA1F3E',    // 기본 테두리 색은 #AA1F3E
  borderRadius = 10,          // 기본 테두리 반경은 10px
  onClick,                    // 클릭 이벤트 핸들러
  children,                   // 버튼에 들어갈 텍스트
  disabled = false,           // 기본 비활성화 상태는 false
}) => {
  // 버튼 스타일
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: backgroundColor,
    borderRadius: `${borderRadius}px`,
    border: `1px solid ${borderColor}`,
    cursor: disabled ? 'not-allowed' : 'pointer', // disabled 상태일 때 커서를 'not-allowed'로 설정
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, border-color 0.3s, color 0.3s', // 부드러운 전환 효과
    color: disabled ? '#888' : borderColor, // disabled 상태일 때 색상 변경
    opacity: disabled ? 0.6 : 1, // 비활성화 상태에서 투명도 낮추기
  };

  // 마우스 오버 효과 스타일
  const hoverStyle = {
    backgroundColor: '#445366',  // 회색톤으로 변경
    borderColor: '#ffffff',      // 더 어두운 테두리 색상
    color: '#ffffff',             // 글자 색상도 더 어두운 빨간색
  };

  // 클릭 시 스타일이 적용되도록 hover 효과 추가
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!disabled) {
      (e.target as HTMLElement).style.backgroundColor = hoverStyle.backgroundColor;
      (e.target as HTMLElement).style.borderColor = hoverStyle.borderColor;
      (e.target as HTMLElement).style.color = hoverStyle.color;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!disabled) {
      (e.target as HTMLElement).style.backgroundColor = backgroundColor;
      (e.target as HTMLElement).style.borderColor = borderColor;
      (e.target as HTMLElement).style.color = borderColor;
    }
  };

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {children}
    </div>
  );
};

export default Button;
