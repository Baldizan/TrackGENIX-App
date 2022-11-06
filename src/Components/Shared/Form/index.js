import React from 'react';
import styles from './form.module.css';

const Form = ({ children, name, autoComplete, noValidate, onSubmit, legend, title }) => {
  return (
    <form
      className={styles.form}
      name={name}
      autoComplete={autoComplete}
      noValidate={noValidate}
      onSubmit={onSubmit}
    >
      {title ? (title = <h2 className={styles.title}>{title}</h2>) : null}
      <fieldset className={styles.fieldset}>
        {legend ? <legend className={styles.legend}>{legend}</legend> : null}
        {children}
      </fieldset>
    </form>
  );
};

export default Form;
