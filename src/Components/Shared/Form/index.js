import React from 'react';
import styles from './form.module.css';
import Button from '../Button';

const Form = ({
  children,
  name,
  autoComplete,
  noValidate = false,
  onSubmit,
  legend,
  title,
  secondColumnIndex
}) => {
  return (
    <form
      className={styles.form}
      name={name}
      autoComplete={autoComplete}
      noValidate={noValidate}
      onSubmit={onSubmit}
    >
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      <div className={secondColumnIndex ? styles.fieldsetColumns : styles.fieldsetContainer}>
        <fieldset className={styles.fieldset}>
          {legend ? (
            <legend className={styles.legend}>{Array.isArray(legend) ? legend[0] : legend}</legend>
          ) : null}
          {children.slice(0, secondColumnIndex)}
        </fieldset>
        {secondColumnIndex ? (
          <fieldset className={styles.fieldset}>
            {legend ? (
              <legend className={styles.legend}>{Array.isArray(legend) ? legend[1] : null}</legend>
            ) : null}
            {children.slice(secondColumnIndex)}
          </fieldset>
        ) : null}
      </div>
      <div className={styles.btnContainer}>
        <Button
          type="submit"
          label="Submit"
          disabled={noValidate}
          theme={noValidate ? 'disabled' : 'primary'}
        />
      </div>
    </form>
  );
};

export default Form;
