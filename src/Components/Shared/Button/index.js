import React from 'react';
import styles from './button.module.css';

const Button = ({
  type = 'button',
  label,
  onClick,
  disabled,
  style,
  hidden,
  icon,
  theme = icon ? icon : 'primary'
}) => {
  return (
    <button
      type={type}
      className={`
        ${style}
        ${styles.default}
        ${icon && styles.icon}
        ${!disabled && theme && styles[theme]}
        ${hidden && styles.hidden}
        ${disabled && styles.disabled}
      `}
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
    >
      {icon ? <img className={`${styles.icon} ${styles.image}`} src={icon} /> : label}
    </button>
  );
};

export default Button;
