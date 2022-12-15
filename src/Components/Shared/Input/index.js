import styles from './input.module.css';

import React from 'react';

const Input = ({
  name,
  title,
  id,
  type,
  value,
  placeholder,
  disabled,
  required,
  error,
  onChange,
  register = () => {}
}) => {
  return (
    <label className={styles.label}>
      {title}
      <input
        {...register(name, { required: { value: true, message: 'error' } })}
        className={`${disabled && styles.disabled} ${styles.input}`}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
      />
      {type !== 'search' ? (
        <p className={`${styles.error} ${!error && styles.hidden}`}>{error}</p>
      ) : null}
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
  required,
  error,
  register = () => {}
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
        {...register(name, { required: { value: true, message: 'error' } })}
        type={type}
        value={value}
        required={required}
      >
        <option value="" disabled hidden selected>
          {placeholder}
        </option>
        {arrayToMap?.map((item, index) => {
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
