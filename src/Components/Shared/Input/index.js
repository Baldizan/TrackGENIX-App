import styles from './input.module.css';

import React from 'react';

const Input = ({
  name,
  title,
  id,
  type,
  value,
  onChange,
  placeholder,
  disabled,
  required,
  error,
  register = () => {}
}) => {
  return (
    <>
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
          {...register(name)}
        />
      </label>
      <p className={`${styles.error} ${!error && styles.hidden}`}>{error}</p>
    </>
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
  required,
  error
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
        type={type}
        value={value}
        required={required}
      >
        <option value="" hidden disabled>
          {placeholder}
        </option>
        {arrayToMap.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {`${item.label}`}
            </option>
          );
        })}
        ;
      </select>
      <p className={`${styles.error} ${!error && styles.hidden}`}>{error}</p>
    </label>
  );
};

export { Input, Select };
