import styles from './input.module.css';

import React from 'react';

const Input = ({ name, title, id, type, value, onChange, placeholder, disabled, required }) => {
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
        required={required}
      />
    </label>
  );
};

const Select = ({
  name,
  title,
  id,
  type,
  value,
  onChange,
  placeholder,
  arrayToMap,
  disabled,
  required
}) => {
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
        required={required}
      >
        <option selected disabled>
          {placeholder}
        </option>
        {arrayToMap.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.label}
            </option>
          );
        })}
        ;
      </select>
    </label>
  );
};

export { Input, Select };
