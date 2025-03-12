import styles from './button.module.css';

export interface CustomButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?:
    | 'small'
    | 'medium'
    | 'large'
    | 'biglarge'
    | 'kingbiglarge'
    | 'colorsmall'
    | 'colormedium'
    | 'colorlarge'
    | 'colorbiglarge'
    | 'colorkingbiglarge';
  label: string;
  onClick?: () => void;
}

const CustomButton = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
  ...props
}: CustomButtonProps) => {
  const validSizes = [
    'small',
    'medium',
    'large',
    'biglarge',
    'kingbiglarge',
    'colorsmall',
    'colormedium',
    'colorlarge',
    'colorbiglarge',
    'colorkingbiglarge',
  ];

  const mode = primary ? styles['storybook-button--primary'] : styles['storybook-button--secondary'];
  const sizeClass = validSizes.includes(size) ? styles[`storybook-button--${size}`] : styles['storybook-button--medium'];
  const buttonClass = [styles['storybook-button'], sizeClass, mode].filter(Boolean).join(' ');

  console.log('Button classes:', buttonClass); // 디버깅 로그 추가

  return (
    <button
      type="button"
      className={buttonClass}
      style={{ backgroundColor }}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default CustomButton;