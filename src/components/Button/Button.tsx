import { combineClassNames } from 'utils/theme/styleUtils';

import styles from './Button.module.css';

type ButtonProps = {
  children: JSX.Element | string;
  className?: string;
  secondary?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

const Button = ({ className = '', children, type = 'button', secondary, onClick }: ButtonProps): JSX.Element => {
  const buttonClassName = secondary ? combineClassNames([className, styles.button, styles.secondaryButton]) : combineClassNames([className, styles.button]);

  return (
    <button className={buttonClassName} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
