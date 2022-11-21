import styles from './input.module.css';

import React from 'react';

const Input = ({ name, title, id, type, register, placeholder, disabled, error }) => {
  return (
    <>
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
          // required={required}
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
  register,
  error
}) => {
  return (
    <label className={styles.label}>
      {title}
      <select
        {...register(name, { required: { value: true, message: 'error' } })}
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
