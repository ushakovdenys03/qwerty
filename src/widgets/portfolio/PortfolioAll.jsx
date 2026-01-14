import { useState } from "react";
import Portfolio from "./Portfolio";
import styles from "./portfolioAll.module.css";

export default function PortfolioAll({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.maintitle}>Library</h2>
      <p className={styles.maintext}>Examples of our services</p>

      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={prevSlide}
        >
          ‹
        </button>

        <div className={styles.carouselViewport}>
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className={styles.fullScreenSlide}>
                <Portfolio {...slide} slideIndex={index} />
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={nextSlide}
        >
          ›
        </button>

        <div className={styles.dots}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                currentIndex === index ? styles.activeDot : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
