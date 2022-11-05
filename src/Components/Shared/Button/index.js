import React from 'react';
import styles from './button.module.css';

const Button = ({ type = 'button', label, onClick, disabled, style, hidden, theme, icon }) => {
  return (
    <button
      type={type}
      className={`
        ${styles.default}
        ${theme && styles[theme]}
        ${style}
        ${disabled && styles.disabled}
        ${hidden && styles.hidden} ${icon && styles.icon}
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
