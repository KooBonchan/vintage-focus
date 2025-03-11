import styles from './button.module.css';

export interface CustomButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large' | 'biglarge' | 'kingbiglarge' | 
         'colorsmall' | 'colormedium' | 'colorlarge' | 'colorbiglarge' | 'colorkingbiglarge';
  label: string;
  onClick?: () => void;
}

/**
 * A customizable button component with various sizes and styles.
 * @param {CustomButtonProps} props - The props for the CustomButton component.
 * @returns {JSX.Element} A styled button element.
 */
const CustomButton = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
  ...props
}: CustomButtonProps) => {
  const mode = primary ? styles['storybook-button--primary'] : styles['storybook-button--secondary'];
  const sizeClass = styles[`storybook-button--${size}`];
  const buttonClass = [styles['storybook-button'], sizeClass, mode].filter(Boolean).join(' ');

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