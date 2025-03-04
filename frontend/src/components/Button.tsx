import styles from './button.module.css';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large' | 'biglarge' | 'kingbiglarge' |
         'colorsmall' | 'colormedium' | 'colorlarge' | 'colorbiglarge' | 'colorkingbiglarge';
  label: string;
  onClick?: () => void;
}

/** Primary UI component for user interaction */
const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
  ...props
}: ButtonProps) => {
  // mode는 primary 여부에 따라 className을 동적으로 설정합니다.
  const mode = primary ? styles['storybook-button--primary'] : styles['storybook-button--secondary'];

  // 버튼 크기에 따른 스타일을 적용
  const sizeClass = styles[`storybook-button--${size}`];

  // 최종적으로 합쳐진 className
  const buttonClass = [styles['storybook-button'], sizeClass, mode].join(' ');

  return (
    <button
      type="button"
      className={buttonClass}
      style={{ backgroundColor }}
      onClick={onClick}  // onClick 이벤트 핸들러 처리
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
