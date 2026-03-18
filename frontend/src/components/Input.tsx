import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isTextArea?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  isTextArea = false, 
  className = '', 
  ...props 
}) => {
  const inputId = React.useId();
  
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      
      {isTextArea ? (
        <textarea
          id={inputId}
          className={`${styles.input} ${error ? styles.error : ''}`}
          {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
        />
      ) : (
        <input
          id={inputId}
          className={`${styles.input} ${error ? styles.error : ''}`}
          {...props as React.InputHTMLAttributes<HTMLInputElement>}
        />
      )}
      
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;
