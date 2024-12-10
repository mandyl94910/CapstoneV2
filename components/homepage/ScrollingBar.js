import React, { useEffect, useRef } from 'react';
import styles from '../../styles/ScrollingBar.module.css';

const ScrollingBar = () => {
  const scrollRef = useRef(null);
  const images = [
    '/images/homepage/1.png',
    '/images/homepage/2.png',
    '/images/homepage/3.png',
    '/images/homepage/4.png',
    '/images/homepage/5.png',
    '/images/homepage/6.png',
    '/images/homepage/7.png',
    '/images/homepage/8.png',
    '/images/homepage/9.png',
    '/images/homepage/10.png',
    '/images/homepage/11.png'
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            scrollContainer.style.animation = 'none';
            scrollContainer.offsetHeight; // Trigger reflow
            scrollContainer.style.animation = `${styles.scroll} 20s linear infinite`;
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(scrollContainer);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.marqueeSection}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marquee} ref={scrollRef}>
            {[...images, ...images, ...images].map((src, index) => (
              <div key={index} className={styles.marqueeItem}>
                <img 
                  src={src} 
                  alt={`Brand ${index + 1}`}
                  width={120}
                  height={80}
                  loading="lazy"
                  className={styles.brandImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingBar;
