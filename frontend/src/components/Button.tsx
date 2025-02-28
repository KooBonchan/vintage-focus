import styles from './button.module.css';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small'  | 'medium'  | 'large' | 'biglarge'  | 'kingbiglarge'| 'colorsmall'  | 'colormedium' | 'colorlarge' | 'colorbiglarge' | 'colorkingbiglarge' | 'colorkingbiglarge';  
  label: string;
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  return (
    <button
      type="button"
      className={[styles['storybook-button'], styles[`storybook-button--${size}`], styles[mode]].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
