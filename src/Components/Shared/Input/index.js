import styles from './input.module.css';

import React from 'react';

export const Input = (props) => {
  const { name, title, id, type, value, onChange, placeholder, disabled } = props;
  return (
    <label className={styles.label}>
      {title}
      <input
        className={`${disabled && styles.disabled} ${styles.input}`}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  );
};

export const Select = (props) => {
  const { name, title, id, type, value, onChange, placeholder, arrayToMap, disabled } = props;
  return (
    <label className={styles.label}>
      {title}
      <select
        className={`${disabled && styles.disabled} ${styles.input}`}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      >
        {arrayToMap.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
};
