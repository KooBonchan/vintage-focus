import { MiscellaneousServicesRounded, PlusOne } from "@mui/icons-material";
import { styled } from "@mui/material";

export interface ButtonProps {
  type: 'p+' | 'm-';  // Only plus or minus sizes allowed
  backgroundColor?: string;
  borderColor?: string;
  onClick?: () => void;
}

const CustomButton = styled('button')<ButtonProps>(({
  type, backgroundColor, borderColor 
}) => {

  const size = '40px';  // 고정된 크기 설정

  return {
    backgroundColor,
    borderColor,
    borderRadius: '50%',
    width: size,
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, border-color 0.3s',
    '&:hover': {
      backgroundColor: backgroundColor ? darken(backgroundColor, 0.1) : '#f0f0f0', // optional: darken the background on hover
    },
    '&:active': {
      backgroundColor: backgroundColor ? darken(backgroundColor, 0.2) : '#e0e0e0', // optional: darken the background on active
    },
  };
});



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


/** Primary UI component for user interaction */
export const ActionButton = ({
  type,
  backgroundColor = '#ffffff',
  borderColor = '#555ab9',
  ...props
}: ButtonProps) => {
  let buttonContent;

  // Set button content for "+" and "-" buttons
  if (type === 'p+') {
    buttonContent = <PlusOne />;  // For plus buttons
  } else {
    buttonContent = <MiscellaneousServicesRounded />;  // For minus buttons
  }

  return (
    <CustomButton type={type} backgroundColor={backgroundColor} borderColor={borderColor}>
      {buttonContent}
    </CustomButton>
  );
};
