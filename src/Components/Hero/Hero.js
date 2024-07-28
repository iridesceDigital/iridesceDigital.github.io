import React from "react";
import styles from './Hero.module.css';
import video from "../../assets/id-hero.mp4";

export const Home = () => {
  return (
    <div className={styles['hero-container']}>
      <video autoPlay loop muted className={styles['hero-video']}>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <header className={styles['hero-header']}>
        <h1 className={styles['hero-title']}>For the visionaires.</h1>
        <p className={styles['hero-subtitle']}>Bring your ideas to life</p>
        <button className={styles['hero-button']}>Begin</button>
      </header>
    </div>
  );
};

export default Home;
