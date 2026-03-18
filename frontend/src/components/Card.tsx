import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  header, 
  footer, 
  className = '',
  noPadding = false
}) => {
  return (
    <div className={`${styles.card} ${className} ${noPadding ? styles.noPadding : ''}`}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
