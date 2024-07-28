import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>About iridesceDigital</h4>
          <p>iridesceDigital is a creative agency specializing in branding strategy, graphic design, web development, social media management, content creation, videography, and photography.</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Contact Us</h4>
          <p>Email: hello@iridesce.digital</p>
          <p>Phone: 076969 4200 </p>
        </div>
        <div className={styles.footerSection}>
          <h4>Follow Us</h4>
          <p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 iridesceDigital. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;