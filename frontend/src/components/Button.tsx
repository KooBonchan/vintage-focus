import React from 'react';

interface ButtonProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  width = 66,
  height = 25,
  backgroundColor = '#445366',
  borderColor = '#ffffff',
  borderRadius = 10,
  onClick,
  children,
  disabled = false,
}) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: backgroundColor,
    borderRadius: `${borderRadius}px`,
    border: `1px solid ${borderColor}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
    color: disabled ? '#888' : borderColor,
    opacity: disabled ? 0.6 : 1,
  };

  const hoverStyle = {
    backgroundColor: '#ffffff',
    borderColor: '#AA1F3E',
    color: '#AA1F3E',
  };

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
