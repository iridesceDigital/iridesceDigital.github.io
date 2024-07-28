import React from "react";
import styles from './Home.module.css';
import Hero from '../Hero/Hero';

import InfoBox from '../InfoBox/InfoBox';
import { PiFingerprintSimpleBold } from "react-icons/pi";
import { FaCode } from "react-icons/fa6";
import { BiBrush } from "react-icons/bi";


export const Home = () => {
  return (
    <div className={styles['home-container']}>
      <Hero />
      <div className={styles['info-boxes-container']}>
        <InfoBox 
          icon={<PiFingerprintSimpleBold />} 
          title="Brand Development" 
          description="Our web development team at iridesceDigital builds responsive, user-friendly websites that drive engagement and conversions. From e-commerce platforms to corporate websites, we deliver custom solutions tailored to your business needs using the latest technologies." 
        />
        <InfoBox 
          icon={<FaCode />} 
          title="Web Development" 
          description="Our web development team at iridesceDigital builds responsive, user-friendly websites that drive engagement and conversions. From e-commerce platforms to corporate websites, we deliver custom solutions tailored to your business needs using the latest technologies." 
        />
        <InfoBox 
          icon={<BiBrush />} 
          title="Media" 
          description="iridesceDigital offers a full suite of creative services including content creation, graphic design, and photography. Our talented team produces compelling visuals and engaging content that captures your brand's essence and communicates your message effectively across all channels." 
        />
      </div>
      {/* Other content of the Home component */}
  
    </div>
  );
};

export default Home;