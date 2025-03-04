import styles from './button.module.css';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large' | 'biglarge' | 'kingbiglarge' | 
         'colorsmall' | 'colormedium' | 'colorlarge' | 'colorbiglarge' | 'colorkingbiglarge';
  label: string;
  onClick?: () => void;
}

const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
  ...props
}: ButtonProps) => {
  const mode = primary ? styles['storybook-button--primary'] : styles['storybook-button--secondary'];
  const sizeClass = styles[`storybook-button--${size}`];
  const buttonClass = [styles['storybook-button'], sizeClass, mode].join(' ');

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

export default Button;