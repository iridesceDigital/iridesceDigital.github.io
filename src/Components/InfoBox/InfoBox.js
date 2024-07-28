import React from 'react';
import styles from './InfoBox.module.css';

const InfoBox = ({ icon, title, description }) => {
  return (
    <div className={styles['info-box']}>
      <div className={styles['icon']}>{icon}</div>
      <h3 className={styles['title']}>{title}</h3>
      <p className={styles['description']}>{description}</p>
    </div>
  );
};

export default InfoBox;